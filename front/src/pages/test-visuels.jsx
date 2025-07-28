import React from 'react';
import Head from 'next/head';
import CardDisplayExample from '../components/examples/CardDisplayExample';
import SquadFieldCardDisplay from '../components/ui/SquadFieldCardDisplay';

export default function TestVisuels() {
  return (
    <>
      <Head>
        <title>Test Visuels - SQUADFIELD</title>
        <meta name="description" content="Page de test pour l'intégration des visuels responsive" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        {/* Test du nouveau générateur SquadField */}
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            🎯 Test Générateur SquadField Authentique
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Carte SquadField Gwen */}
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-4">Carte Style Gwen (Epic)</h2>
              <SquadFieldCardDisplay 
                player={{
                  name: 'GWEN',
                  age: 16,
                  position: 'ATT',
                  team: 'SQUADFIELD',
                  overall: 88,
                  technique: 85,
                  physique: 78,
                  mental: 82,
                  vitesse: 90,
                  tir: 88,
                  passe: 84,
                  photo: null
                }}
                size="lg"
              />
            </div>

            {/* Carte Legendary */}
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-4">Carte Legendary (Or)</h2>
              <SquadFieldCardDisplay 
                player={{
                  name: 'KYLIAN',
                  age: 25,
                  position: 'ATT',
                  team: 'PSG',
                  overall: 95,
                  technique: 94,
                  physique: 89,
                  mental: 92,
                  vitesse: 97,
                  tir: 95,
                  passe: 88,
                  photo: null
                }}
                size="lg"
              />
            </div>

            {/* Carte Common */}
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-4">Carte Common (Gris)</h2>
              <SquadFieldCardDisplay 
                player={{
                  name: 'DÉBUTANT',
                  age: 14,
                  position: 'MIL',
                  team: 'ACADEMY',
                  overall: 65,
                  technique: 60,
                  physique: 55,
                  mental: 70,
                  vitesse: 68,
                  tir: 50,
                  passe: 75,
                  photo: null
                }}
                size="lg"
              />
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">📊 Système de Rareté SquadField</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-center">
                <div className="text-red-400 font-bold">MYTHIC</div>
                <div className="text-white">95+</div>
              </div>
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 text-center">
                <div className="text-yellow-400 font-bold">LEGENDARY</div>
                <div className="text-white">90+</div>
              </div>
              <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-3 text-center">
                <div className="text-purple-400 font-bold">EPIC</div>
                <div className="text-white">85+</div>
              </div>
              <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-3 text-center">
                <div className="text-blue-400 font-bold">RARE</div>
                <div className="text-white">80+</div>
              </div>
              <div className="bg-cyan-500/20 border border-cyan-500/50 rounded-lg p-3 text-center">
                <div className="text-cyan-400 font-bold">UNCOMMON</div>
                <div className="text-white">70+</div>
              </div>
              <div className="bg-gray-500/20 border border-gray-500/50 rounded-lg p-3 text-center">
                <div className="text-gray-400 font-bold">COMMON</div>
                <div className="text-white">&lt;70</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section anciens visuels */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            📋 Anciens Visuels (Référence)
          </h2>
          <CardDisplayExample />
        </div>
      </div>
    </>
  );
}
