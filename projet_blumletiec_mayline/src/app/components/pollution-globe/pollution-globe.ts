
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
  inject
} from '@angular/core';

import world from 'world-atlas/countries-110m.json';
import { feature } from 'topojson-client';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { Pollution } from '../../models/pollution';

@Component({
  selector: 'app-pollution-globe',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pollution-globe.html',
  styleUrl: './pollution-globe.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollutionGlobe implements AfterViewInit, OnChanges, OnDestroy {

  @ViewChild('globeCanvas')
  private canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() pollutions: Pollution[] = [];

  selectedPollution: Pollution | null = null;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly cdr = inject(ChangeDetectorRef);

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;

  private globe!: THREE.Mesh;
  private markers = new THREE.Group();

  private animationId = 0;
  private resizeObserver?: ResizeObserver;

  private readonly raycaster = new THREE.Raycaster();
  private readonly mouse = new THREE.Vector2();

  private markerMeshes: THREE.Mesh[] = [];

  ngAfterViewInit(): void {
    // Three.js nécessite un navigateur compatible WebGL.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.initialiserGlobe();
    this.creerMarqueurs();
    this.demarrerAnimation();
    this.surveillerDimensions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pollutions'] && this.scene) {
      this.creerMarqueurs();
    }
  }

  /**
   * Initialise la scène 3D, la caméra et les lumières.
   */
  private initialiserGlobe(): void {
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf5f5f7);

    this.camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      100
    );

    this.camera.position.set(0, 0, 3.5);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Éclairage de la planète.
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight.position.set(3, 2, 4);
    this.scene.add(directionalLight);

    // Création de la planète.
    const geometry = new THREE.SphereGeometry(1, 64, 64);

    const material = new THREE.MeshStandardMaterial({
      map: this.creerTexturePlanete(),
      roughness: 0.9,
      metalness: 0.15
    });

    this.globe = new THREE.Mesh(geometry, material);
    this.scene.add(this.globe);

    // Groupe contenant les marqueurs roses.
    this.globe.add(this.markers);

    // Contrôles de rotation, zoom et déplacement.
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = true;
    this.controls.enablePan = true;

    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.7;

    this.controls.minDistance = 1.8;
    this.controls.maxDistance = 5;

    this.renderer.domElement.addEventListener(
      'click',
      this.onCanvasClick
    );
  }

  private creerTexturePlanete(): THREE.CanvasTexture {
  // Création d'une carte rectangulaire qui sera appliquée sur la sphère.
  const canvas = document.createElement('canvas');
  canvas.width = 4096;
  canvas.height = 2048;

  const context = canvas.getContext('2d')!;

  // Fond des océans.
  context.fillStyle = '#292d32';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Conversion des données TopoJSON en GeoJSON.
  const donneesGeo: any = feature(
    world as any,
    (world as any).objects.countries
  );

  // Style des pays et de leurs frontières.
  context.fillStyle = '#777e86';
  context.strokeStyle = '#c0c5cb';
  context.lineWidth = 1.5;

  // Parcours de chaque pays.
  for (const pays of donneesGeo.features) {
    const geometrie = pays.geometry;

    if (!geometrie) continue;

    // Un pays peut être composé d'un ou de plusieurs polygones.
    const polygones =
      geometrie.type === 'Polygon'
        ? [geometrie.coordinates]
        : geometrie.type === 'MultiPolygon'
          ? geometrie.coordinates
          : [];

    for (const polygone of polygones) {
      context.beginPath();

      // Chaque contour est constitué de coordonnées longitude / latitude.
      for (const contour of polygone) {
        contour.forEach(
          ([longitude, latitude]: [number, number], index: number) => {
            const x = ((longitude + 180) / 360) * canvas.width;
            const y = ((90 - latitude) / 180) * canvas.height;

            if (index === 0) {
              context.moveTo(x, y);
            } else {
              context.lineTo(x, y);
            }
          }
        );

        context.closePath();
      }

      // Dessin du pays et de ses frontières.
      context.fill('evenodd');
      context.stroke();
    }
  }

  // Création de la texture Three.js.
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}
  /**
   * Convertit une latitude et une longitude en position 3D.
   */
  /**
 * Convertit une latitude et une longitude GPS en position 3D.
 * La formule tient compte de l'orientation de la texture de la planète.
 */
/**
 * Convertit les coordonnées GPS en position 3D
 * en respectant l'orientation de la texture SphereGeometry.
 */
private convertirCoordonnees(
  latitude: number,
  longitude: number
): THREE.Vector3 {

  const lat = THREE.MathUtils.degToRad(latitude);
  const lon = THREE.MathUtils.degToRad(longitude);

  return new THREE.Vector3(
    Math.cos(lat) * Math.cos(lon),
    Math.sin(lat),
    -Math.cos(lat) * Math.sin(lon)
  );
}

  /**
   * Crée un marqueur rose pour chaque pollution géolocalisée.
   */
  private creerMarqueurs(): void {
    if (!this.markers) {
      return;
    }

    this.markers.clear();
    this.markerMeshes = [];

    for (const pollution of this.pollutions) {

      if (
        !Number.isFinite(pollution.latitude) ||
        !Number.isFinite(pollution.longitude) ||
        pollution.latitude < -90 ||
        pollution.latitude > 90 ||
        pollution.longitude < -180 ||
        pollution.longitude > 180
      ) {
        continue;
      }

      const position = this.convertirCoordonnees(
        pollution.latitude,
        pollution.longitude
      );

      const markerGroup = new THREE.Group();

      markerGroup.position.copy(position.clone().multiplyScalar(1.005));

      // Oriente le marqueur vers l'extérieur de la planète.
      markerGroup.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        position
      );

      // Petite tige rose.
      const stemGeometry = new THREE.CylinderGeometry(
        0.005,
        0.009,
        0.055,
        8
      );

      const markerMaterial = new THREE.MeshBasicMaterial({
        color: 0xec4899
      });

      const stem = new THREE.Mesh(stemGeometry, markerMaterial);
      stem.position.y = 0.025;
      markerGroup.add(stem);

      // Point central cliquable.
      const pointGeometry = new THREE.SphereGeometry(0.025, 16, 16);
      const point = new THREE.Mesh(pointGeometry, markerMaterial);

      point.position.y = 0.065;
      point.userData['pollution'] = pollution;

      markerGroup.add(point);

      // Halo lumineux autour du marqueur.
      const haloGeometry = new THREE.SphereGeometry(0.045, 16, 16);

      const haloMaterial = new THREE.MeshBasicMaterial({
        color: 0xf472b6,
        transparent: true,
        opacity: 0.35
      });

      const halo = new THREE.Mesh(haloGeometry, haloMaterial);
      halo.position.y = 0.065;

      markerGroup.add(halo);

      this.markerMeshes.push(point);
      this.markers.add(markerGroup);
    }
  }

  /**
   * Détecte le clic sur un marqueur.
   */
  private onCanvasClick = (event: MouseEvent): void => {
    const canvas = this.renderer.domElement;
    const rect = canvas.getBoundingClientRect();

    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersections = this.raycaster.intersectObjects(
      this.markerMeshes,
      false
    );

    if (intersections.length > 0) {
      const pollution = intersections[0].object.userData['pollution'];

      this.selectedPollution = pollution;
    } else {
      this.selectedPollution = null;
    }

    this.cdr.markForCheck();
  };

  /**
   * Anime la scène et actualise les contrôles.
   */
  private demarrerAnimation(): void {
    const animate = (): void => {
      this.animationId = requestAnimationFrame(animate);

      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  /**
   * Adapte le rendu lorsque la taille du conteneur change.
   */
  private surveillerDimensions(): void {
    this.resizeObserver = new ResizeObserver(() => {
      const canvas = this.canvasRef.nativeElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (width === 0 || height === 0) {
        return;
      }

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(width, height);
    });

    this.resizeObserver.observe(this.canvasRef.nativeElement);
  }

  /**
   * Ferme les informations du marqueur sélectionné.
   */
  fermerDetails(): void {
    this.selectedPollution = null;
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    cancelAnimationFrame(this.animationId);

    this.resizeObserver?.disconnect();

    if (this.renderer) {
      this.renderer.domElement.removeEventListener(
        'click',
        this.onCanvasClick
      );

      this.controls.dispose();

      this.scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();

          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      this.renderer.dispose();
    }
  }
}
