# 🚀 GUIDE D'INSTALLATION BACKEND PYTHON

## ✅ **STATUT ACTUEL**

- ✅ **Frontend actif** : http://localhost:3001
- ❌ **Backend requis** : Python non installé

## 🔧 **INSTALLATION PYTHON - 3 OPTIONS**

### **OPTION 1 : Installation Microsoft Store (RECOMMANDÉE)**

1. **Ouvrir Microsoft Store**
2. **Rechercher "Python"**
3. **Installer "Python 3.12"** (version récente)
4. **Attendre l'installation complète**

### **OPTION 2 : Installation Classique**

1. **Aller sur** : https://www.python.org/downloads/
2. **Télécharger Python 3.12** (dernier version)
3. **Lancer l'installeur**
4. **⚠️ IMPORTANT** : Cocher **"Add Python to PATH"**
5. **Cliquer "Install Now"**

### **OPTION 3 : Anaconda (Pour développeurs)**

1. **Aller sur** : https://www.anaconda.com/download
2. **Télécharger Anaconda**
3. **Installer avec les options par défaut**

## 🔄 **APRÈS INSTALLATION PYTHON**

### **1. Vérifier Python**
```cmd
python --version
# OU
py --version
```

### **2. Installer les dépendances Backend**
```cmd
cd mvp-squadfield/backend
pip install -r requirements.txt
```

### **3. Lancer le Backend**
```cmd
cd mvp-squadfield/backend
python app.py
```

**OU utiliser le script automatique** :
```cmd
cd mvp-squadfield/backend
.\start_backend.bat
```

## 🌐 **ACCÈS AU SITE COMPLET**

Une fois Python installé et backend lancé :

- **Frontend** : http://localhost:3001
- **Backend** : http://localhost:5000
- **Site complet** : http://localhost:3001 (avec backend connecté)

## 🎯 **FONCTIONNALITÉS DISPONIBLES**

### **Avec Frontend seulement (MAINTENANT)** :
- ✅ Navigation du site
- ✅ Interface utilisateur
- ✅ Authentification Firebase (si activée)
- ❌ Génération de cartes IA
- ❌ Analyse vidéo

### **Avec Frontend + Backend** :
- ✅ Toutes les fonctionnalités
- ✅ Génération de cartes DALL-E
- ✅ Analyse de vidéos
- ✅ Calcul de statistiques
- ✅ Upload et traitement

## 🚨 **ACCÈS IMMÉDIAT**

**Vous pouvez déjà consulter le site sur** : http://localhost:3001

**Pages disponibles** :
- `/` - Page d'accueil
- `/login` - Connexion
- `/dashboard` - Tableau de bord
- `/galerie` - Galerie de cartes
- `/showcase` - Présentation

## 🔍 **DÉPANNAGE**

### **Si Python ne se lance pas après installation** :
1. **Redémarrer VSCode**
2. **Redémarrer l'ordinateur**
3. **Vérifier PATH** : `echo $env:PATH` (PowerShell)

### **Si erreur "module not found"** :
```cmd
cd mvp-squadfield/backend
pip install --upgrade pip
pip install -r requirements.txt
```

---

**🎉 ACCÈS IMMÉDIAT** : http://localhost:3001
