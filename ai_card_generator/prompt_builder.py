"""
Module pour construire dynamiquement les prompts GPT-4 + DALL·E selon les règles SquadField.
"""

def build_dalle_prompt(player_data):
    """
    Construit un prompt DALL·E optimisé pour générer une carte SquadField.
    
    Args:
        player_data (dict): Données enrichies du joueur (avec overall_score, age_category, card_color)
        
    Returns:
        str: Prompt formaté pour DALL·E
    """
    prenom = player_data['prenom']
    age_category = player_data['age_category']
    overall_score = player_data['overall_score']
    card_color = player_data['card_color']
    sport = player_data['sport']
    stats = player_data.get('stats', {})
    
    # Extraction des stats individuelles
    technique = stats.get('technique', 70)
    vitesse = stats.get('vitesse', 70)
    physique = stats.get('physique', 70)
    tirs = stats.get('tirs', 70)
    defense = stats.get('defense', 70)
    passe = stats.get('passe', 70)
    
    # Descriptions des couleurs pour un rendu visuel optimal
    color_descriptions = {
        "gris": "fond gris métallique avec reflets subtils",
        "bronze": "fond bronze brillant avec texture métallique cuivrée",
        "jaune": "fond jaune doré éclatant avec éclats lumineux",
        "vert": "fond vert émeraude vibrant avec reflets cristallins",
        "violet": "fond violet royal profond avec éclats magiques",
        "doré": "fond or premium avec textures luxueuses et reflets dorés",
        "platine": "fond platine ultra-premium avec éclats argentés",
        "star": "fond constellation étoilée avec effets galaxie et particules dorées"
    }
    
    color_desc = color_descriptions.get(card_color, "fond coloré brillant")
    
    # Construction du prompt principal
    prompt = f"""Génère une carte réaliste SquadField de collection avec {color_desc}.

JOUEUR: {prenom}
CATÉGORIE: {age_category}
NOTE GLOBALE: {overall_score}
SPORT: {sport}

STATISTIQUES DÉTAILLÉES:
- Technique: {technique}
- Vitesse: {vitesse}  
- Physique: {physique}
- Tirs: {tirs}
- Défense: {defense}
- Passe: {passe}

LAYOUT REQUIS:
- Prénom "{prenom}" en haut à gauche en police moderne et lisible
- Catégorie "{age_category}" en haut à droite en caractères distinctifs
- Note globale "{overall_score}" dans un cercle centré et proéminent
- Les 6 statistiques dans des cases alignées en bas: {technique}, {vitesse}, {physique}, {tirs}, {defense}, {passe}

STYLE GRAPHIQUE:
- Design moderne et premium dans l'esprit SquadField
- Effets visuels professionnels et réalistes
- Qualité de carte de collection haut de gamme
- Typographie claire et lisible
- Éléments graphiques cohérents avec l'univers sportif
- Finition brillante et textures détaillées

CONTRAINTES:
- Conserver le portrait du joueur en couleur intégré harmonieusement
- Fond travaillé mais sans surcharger la lisibilité
- Équilibre entre esthétique et fonctionnalité
- Respect des codes visuels SquadField"""

    return prompt


def build_gpt4_analysis_prompt(player_data, video_url=None):
    """
    Construit un prompt GPT-4 pour analyser les performances d'un joueur.
    
    Args:
        player_data (dict): Données du joueur
        video_url (str, optional): URL de la vidéo à analyser
        
    Returns:
        str: Prompt d'analyse pour GPT-4
    """
    prenom = player_data['prenom']
    age = player_data['age']
    sport = player_data['sport']
    
    if video_url:
        prompt = f"""Analyse cette vidéo de {prenom}, {age} ans, pratiquant le {sport}.

OBJECTIF: Évaluer ses performances sur une échelle de 0 à 100 dans ces 6 domaines:
- Technique: Maîtrise gestuelle, précision technique
- Vitesse: Rapidité d'exécution, réactivité
- Physique: Condition physique, endurance, force
- Tirs: Précision, puissance, placement (si applicable)
- Défense: Positionnement défensif, interceptions
- Passe: Qualité des passes, vision de jeu

ANALYSE ATTENDUE:
1. Observation détaillée des actions dans la vidéo
2. Attribution d'une note 0-100 pour chaque domaine
3. Justification de chaque note
4. Score global calculé (moyenne des 6 notes)
5. Points forts et axes d'amélioration

FORMAT DE RÉPONSE:
```json
{
    "technique": 85,
    "vitesse": 78,
    "physique": 82,
    "tirs": 80,
    "defense": 75,
    "passe": 88,
    "score_global": 81,
    "analyse": "Analyse détaillée...",
    "points_forts": ["Point 1", "Point 2"],
    "ameliorations": ["Amélioration 1", "Amélioration 2"]
}
```"""
    else:
        prompt = f"""Génère une estimation de performance pour {prenom}, {age} ans, pratiquant le {sport}.

En l'absence de vidéo, base-toi sur des moyennes statistiques réalistes pour cette tranche d'âge et ce sport.

DOMAINES À ÉVALUER (0-100):
- Technique: Maîtrise gestuelle moyenne pour l'âge
- Vitesse: Capacités physiques typiques
- Physique: Condition physique standard
- Tirs: Précision moyenne (si applicable)
- Défense: Compétences défensives de base
- Passe: Qualité de jeu collectif

CRITÈRES D'ESTIMATION:
- Jeunes (< 20 ans): Potentiel en développement (60-80)
- Elite (20-29): Pic de performance (70-90)
- Senior (30-39): Expérience compensant le physique (65-85)
- Master (40+): Technique préservée, physique adapté (60-80)

Génère des statistiques cohérentes et réalistes."""
    
    return prompt


def validate_prompt_data(player_data):
    """
    Valide que les données nécessaires sont présentes pour générer un prompt.
    
    Args:
        player_data (dict): Données du joueur à valider
        
    Returns:
        tuple: (bool, str) - (is_valid, error_message)
    """
    required_for_prompt = ['prenom', 'age_category', 'overall_score', 'card_color', 'sport']
    
    for field in required_for_prompt:
        if field not in player_data:
            return False, f"Données manquantes pour le prompt: {field}"
    
    if not player_data['prenom'].strip():
        return False, "Le prénom ne peut pas être vide"
    
    if player_data['overall_score'] < 0 or player_data['overall_score'] > 100:
        return False, "Score global invalide (doit être entre 0 et 100)"
    
    return True, "Données valides pour le prompt"


def get_style_modifiers(card_color):
    """
    Retourne des modificateurs de style spécifiques selon la couleur de carte.
    
    Args:
        card_color (str): Couleur de la carte
        
    Returns:
        dict: Modificateurs de style
    """
    modifiers = {
        "gris": {
            "effects": "effets métalliques subtils",
            "atmosphere": "sobre et élégant",
            "lighting": "éclairage neutre et professionnel"
        },
        "bronze": {
            "effects": "reflets cuivrés et textures bronze",
            "atmosphere": "chaleureux et terreux",
            "lighting": "éclairage doré tamisé"
        },
        "jaune": {
            "effects": "éclats dorés et brillance éclatante",
            "atmosphere": "lumineux et énergique",
            "lighting": "éclairage vif et dynamique"
        },
        "vert": {
            "effects": "reflets émeraude et cristallins",
            "atmosphere": "naturel et apaisant",
            "lighting": "éclairage verdoyant et frais"
        },
        "violet": {
            "effects": "aura mystique et effets magiques",
            "atmosphere": "royal et mystérieux",
            "lighting": "éclairage pourpre et mystique"
        },
        "doré": {
            "effects": "luxe premium et dorures éclatantes",
            "atmosphere": "prestigieux et royal",
            "lighting": "éclairage or intense et premium"
        },
        "platine": {
            "effects": "ultra-premium avec effets argentés",
            "atmosphere": "exclusif et raffiné",
            "lighting": "éclairage platine ultra-brillant"
        },
        "star": {
            "effects": "effets stellaires et particules cosmiques",
            "atmosphere": "légendaire et cosmique",
            "lighting": "éclairage constellation avec effets galaxie"
        }
    }
    
    return modifiers.get(card_color, modifiers["gris"])
