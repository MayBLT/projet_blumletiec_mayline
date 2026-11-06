BEGIN;

-- Vérifier que la sauvegarde n'existe pas déjà.
DO $$
BEGIN
    IF to_regclass('public.pollution_backup') IS NOT NULL THEN
        RAISE EXCEPTION 'Backup exists';
    END IF;
END $$;

-- Sauvegarder les anciennes données.
ALTER TABLE pollution RENAME TO pollution_backup;

-- Recréer la table selon les anciens TP.
CREATE TABLE pollution (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    titre VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    code_postal VARCHAR(20) NOT NULL,
    ville VARCHAR(150) NOT NULL,
    pays VARCHAR(100) NOT NULL,
    rue VARCHAR(255),
    numero VARCHAR(20),
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    photo_url TEXT,
    CONSTRAINT pollution_current_pkey PRIMARY KEY (id)
);

-- Réimporter les trois anciens signalements.
INSERT INTO pollution (
    id, titre, type, description, date,
    code_postal, ville, pays, rue, numero,
    latitude, longitude, photo_url
)
OVERRIDING SYSTEM VALUE
VALUES
(
    1, 'v,bkjfxnbbklb,', 'Sol',
    'b,lkgfb,kgfbn,kxfmbn,mfxkb',
    '2026-10-15', '67000', 'fgbfgbfbfb',
    'bfgbfbxff', '', '', 44, 55, ''
),
(
    2, 'test mayline', 'Eau',
    'des dechets presents au milieu des poissons',
    '2026-10-28', '67000', 'STRASBOURG',
    'France', 'Boulevard d''Anvers', '', 44, 44, ''
),
(
    3, 'pollution dans l''Ill', 'Eau',
    'Plusieurs poissons morts, des vélos au milieu des ' || 'ragondins',
    '2026-10-20', '67000', 'STRASBOURG',
    'France', '', '', 48, 7.7, ''
);

-- Réinitialiser la séquence des identifiants.
SELECT setval(
    pg_get_serial_sequence('public.pollution', 'id'),
    (SELECT MAX(id) FROM pollution)
);

COMMIT;