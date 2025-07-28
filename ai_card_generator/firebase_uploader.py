"""
Module pour uploader les cartes générées sur Firebase Storage.
"""

import os
import uuid
from datetime import datetime
import firebase_admin
from firebase_admin import credentials, storage
import requests
from io import BytesIO


def initialize_firebase():
    """
    Initialise Firebase Admin SDK.
    
    Returns:
        bool: True si l'initialisation réussit, False sinon
    """
    try:
        # Vérifier si Firebase est déjà initialisé
        if firebase_admin._apps:
            return True
            
        # Chemin vers le fichier de credentials
        cred_path = os.getenv('FIREBASE_SERVICE_ACCOUNT_PATH')
        if not cred_path or not os.path.exists(cred_path):
            print("❌ Fichier de credentials Firebase introuvable")
            return False
        
        # Initialisation avec les credentials
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred, {
            'storageBucket': os.getenv('FIREBASE_STORAGE_BUCKET')
        })
        
        print("✅ Firebase initialisé avec succès")
        return True
        
    except Exception as e:
        print(f"❌ Erreur d'initialisation Firebase: {e}")
        return False


def upload_image_from_url(image_url, player_name, card_color):
    """
    Upload une image depuis une URL vers Firebase Storage.
    
    Args:
        image_url (str): URL de l'image à uploader
        player_name (str): Nom du joueur pour le nommage
        card_color (str): Couleur de la carte pour le nommage
        
    Returns:
        str: URL publique de l'image uploadée, None si erreur
    """
    try:
        if not initialize_firebase():
            return None
        
        # Téléchargement de l'image depuis l'URL
        print(f"📥 Téléchargement de l'image depuis {image_url}")
        response = requests.get(image_url)
        response.raise_for_status()
        
        # Génération d'un nom de fichier unique
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        unique_id = str(uuid.uuid4())[:8]
        filename = f"cards_ai/{player_name}_{card_color}_{timestamp}_{unique_id}.png"
        
        # Upload vers Firebase Storage
        bucket = storage.bucket()
        blob = bucket.blob(filename)
        
        # Upload des données binaires
        blob.upload_from_string(
            response.content,
            content_type='image/png'
        )
        
        # Rendre l'image publique
        blob.make_public()
        
        # Obtenir l'URL publique
        public_url = blob.public_url
        
        print(f"✅ Image uploadée avec succès: {filename}")
        print(f"🔗 URL publique: {public_url}")
        
        return public_url
        
    except requests.RequestException as e:
        print(f"❌ Erreur de téléchargement de l'image: {e}")
        return None
    except Exception as e:
        print(f"❌ Erreur d'upload Firebase: {e}")
        return None


def upload_image_from_file(file_path, player_name, card_color):
    """
    Upload un fichier image local vers Firebase Storage.
    
    Args:
        file_path (str): Chemin vers le fichier local
        player_name (str): Nom du joueur pour le nommage
        card_color (str): Couleur de la carte pour le nommage
        
    Returns:
        str: URL publique de l'image uploadée, None si erreur
    """
    try:
        if not initialize_firebase():
            return None
        
        if not os.path.exists(file_path):
            print(f"❌ Fichier introuvable: {file_path}")
            return None
        
        # Génération d'un nom de fichier unique
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        unique_id = str(uuid.uuid4())[:8]
        file_extension = os.path.splitext(file_path)[1] or '.png'
        filename = f"cards_ai/{player_name}_{card_color}_{timestamp}_{unique_id}{file_extension}"
        
        # Upload vers Firebase Storage
        bucket = storage.bucket()
        blob = bucket.blob(filename)
        
        print(f"📤 Upload du fichier: {file_path}")
        
        # Upload du fichier
        with open(file_path, 'rb') as file_data:
            blob.upload_from_file(file_data, content_type='image/png')
        
        # Rendre l'image publique
        blob.make_public()
        
        # Obtenir l'URL publique
        public_url = blob.public_url
        
        print(f"✅ Fichier uploadé avec succès: {filename}")
        print(f"🔗 URL publique: {public_url}")
        
        return public_url
        
    except Exception as e:
        print(f"❌ Erreur d'upload Firebase: {e}")
        return None


def upload_image_from_bytes(image_bytes, player_name, card_color, file_extension='.png'):
    """
    Upload des données binaires d'image vers Firebase Storage.
    
    Args:
        image_bytes (bytes): Données binaires de l'image
        player_name (str): Nom du joueur pour le nommage
        card_color (str): Couleur de la carte pour le nommage
        file_extension (str): Extension du fichier (défaut: .png)
        
    Returns:
        str: URL publique de l'image uploadée, None si erreur
    """
    try:
        if not initialize_firebase():
            return None
        
        # Génération d'un nom de fichier unique
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        unique_id = str(uuid.uuid4())[:8]
        filename = f"cards_ai/{player_name}_{card_color}_{timestamp}_{unique_id}{file_extension}"
        
        # Upload vers Firebase Storage
        bucket = storage.bucket()
        blob = bucket.blob(filename)
        
        print(f"📤 Upload des données binaires vers: {filename}")
        
        # Déterminer le content-type selon l'extension
        content_type = 'image/png'
        if file_extension.lower() in ['.jpg', '.jpeg']:
            content_type = 'image/jpeg'
        elif file_extension.lower() == '.webp':
            content_type = 'image/webp'
        
        # Upload des données binaires
        blob.upload_from_string(
            image_bytes,
            content_type=content_type
        )
        
        # Rendre l'image publique
        blob.make_public()
        
        # Obtenir l'URL publique
        public_url = blob.public_url
        
        print(f"✅ Données uploadées avec succès: {filename}")
        print(f"🔗 URL publique: {public_url}")
        
        return public_url
        
    except Exception as e:
        print(f"❌ Erreur d'upload Firebase: {e}")
        return None


def check_firebase_config():
    """
    Vérifie la configuration Firebase.
    
    Returns:
        bool: True si la configuration est valide
    """
    required_env_vars = [
        'FIREBASE_SERVICE_ACCOUNT_PATH',
        'FIREBASE_STORAGE_BUCKET'
    ]
    
    missing_vars = []
    for var in required_env_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        print(f"❌ Variables d'environnement manquantes: {', '.join(missing_vars)}")
        return False
    
    # Vérification du fichier de credentials
    cred_path = os.getenv('FIREBASE_SERVICE_ACCOUNT_PATH')
    if not os.path.exists(cred_path):
        print(f"❌ Fichier de credentials introuvable: {cred_path}")
        return False
    
    print("✅ Configuration Firebase valide")
    return True


def delete_image(file_url):
    """
    Supprime une image de Firebase Storage.
    
    Args:
        file_url (str): URL de l'image à supprimer
        
    Returns:
        bool: True si suppression réussie
    """
    try:
        if not initialize_firebase():
            return False
        
        # Extraire le nom du fichier de l'URL
        # Format attendu: https://storage.googleapis.com/bucket-name/path/filename
        if 'storage.googleapis.com' in file_url:
            parts = file_url.split('/')
            bucket_name = parts[3]
            file_path = '/'.join(parts[4:])
            
            bucket = storage.bucket()
            blob = bucket.blob(file_path)
            
            if blob.exists():
                blob.delete()
                print(f"✅ Image supprimée: {file_path}")
                return True
            else:
                print(f"⚠️ Image introuvable: {file_path}")
                return False
        else:
            print(f"❌ URL invalide: {file_url}")
            return False
            
    except Exception as e:
        print(f"❌ Erreur de suppression: {e}")
        return False


def list_cards_ai():
    """
    Liste toutes les cartes IA stockées dans Firebase.
    
    Returns:
        list: Liste des URLs des cartes IA
    """
    try:
        if not initialize_firebase():
            return []
        
        bucket = storage.bucket()
        blobs = bucket.list_blobs(prefix='cards_ai/')
        
        card_urls = []
        for blob in blobs:
            if blob.name.endswith(('.png', '.jpg', '.jpeg', '.webp')):
                card_urls.append(blob.public_url)
        
        print(f"📋 {len(card_urls)} cartes IA trouvées")
        return card_urls
        
    except Exception as e:
        print(f"❌ Erreur de listage: {e}")
        return []
