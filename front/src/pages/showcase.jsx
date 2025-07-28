import React from 'react';
import Head from 'next/head';
import CardShowcase from '../components/CardShowcase';

export default function Showcase() {
  return (
    <>
      <Head>
        <title>Showcase Cartes - SQUADFIELD</title>
        <meta name="description" content="Découvrez nos cartes avec animations flip 3D" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <CardShowcase />
    </>
  );
}
