"""
Module des règles SquadField pour déterminer les catégories d'âge et couleurs de carte.
"""

def get_age_category(age):
    """
    Détermine la catégorie d'âge selon les règles SquadField.
    
    Args:
        age (int): Âge du joueur
        
    Returns:
        str: Catégorie d'âge correspondante
    """
    if age < 20:
        if age <= 8:
            return "U8"
        elif age <= 10:
            return "U10"
        elif age <= 12:
            return "U12"
        elif age <= 15:
            return "U15"
        elif age <= 17:
            return "U17"
        else:
            return "U20"
    elif 20 <= age <= 29:
        return "Elite"
    elif 30 <= age <= 39:
        return "Senior"
    else:  # 40+
        return "Master"


def calculate_overall_score(stats):
    """
    Calcule le score global à partir des statistiques individuelles.
    
    Args:
        stats (dict): Dictionnaire contenant les stats (technique, vitesse, physique, tirs, defense, passe)
        
    Returns:
        int: Score global calculé (moyenne des stats)
    """
    if not stats:
        return 60  # Score par défaut
    
    total = sum(stats.values())
    return round(total / len(stats))


def get_card_color(score):
    """
    Détermine la couleur de carte selon le score global.
    
    Args:
        score (int): Score global du joueur (60-100)
        
    Returns:
        str: Couleur de carte correspondante
    """
    if score < 65:
        return "gris"
    elif score < 75:
        return "bronze"
    elif score < 80:
        return "jaune"
    elif score < 85:
        return "vert"
    elif score < 90:
        return "violet"
    elif score < 95:
        return "doré"
    elif score < 99:
        return "platine"
    else:  # 99-100
        return "star"


def apply_squadfield_rules(player_data):
    """
    Applique toutes les règles SquadField à un joueur.
    
    Args:
        player_data (dict): Données du joueur
        
    Returns:
        dict: Données enrichies avec catégorie et couleur
    """
    # Calcul du score global
    overall_score = calculate_overall_score(player_data.get('stats', {}))
    
    # Détermination de la catégorie d'âge
    age_category = get_age_category(player_data['age'])
    
    # Détermination de la couleur de carte
    card_color = get_card_color(overall_score)
    
    # Enrichissement des données
    enriched_data = player_data.copy()
    enriched_data.update({
        'overall_score': overall_score,
        'age_category': age_category,
        'card_color': card_color
    })
    
    return enriched_data


def validate_player_data(player_data):
    """
    Valide les données d'un joueur.
    
    Args:
        player_data (dict): Données du joueur à valider
        
    Returns:
        tuple: (bool, str) - (is_valid, error_message)
    """
    required_fields = ['prenom', 'age', 'photo_url', 'sport']
    
    for field in required_fields:
        if field not in player_data:
            return False, f"Champ requis manquant: {field}"
    
    if not isinstance(player_data['age'], int) or player_data['age'] < 5 or player_data['age'] > 60:
        return False, "Âge invalide (doit être entre 5 et 60 ans)"
    
    if 'stats' in player_data:
        stats = player_data['stats']
        required_stats = ['technique', 'vitesse', 'physique', 'tirs', 'defense', 'passe']
        
        for stat in required_stats:
            if stat not in stats:
                return False, f"Statistique manquante: {stat}"
            
            if not isinstance(stats[stat], int) or stats[stat] < 0 or stats[stat] > 100:
                return False, f"Valeur invalide pour {stat} (doit être entre 0 et 100)"
    
    return True, "Données valides"
