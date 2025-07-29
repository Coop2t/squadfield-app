import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { collection, query, orderBy, getDocs, limit, startAfter, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import CardPreview from '../components/CardPreview';

export default function Galerie() {
  const { currentUser } = useAuth();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
  const [filter, setFilter] = useState('all'); // all, football, basketball, soccer
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, rating, rarity
  const [searchTerm, setSearchTerm] = useState('');

  const CARDS_PER_PAGE = 12;

  useEffect(() => {
    loadCards(true);
  }, [filter, sortBy]);

  useEffect(() => {
    if (searchTerm) {
      const timeoutId = setTimeout(() => {
        loadCards(true);
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      loadCards(true);
    }
  }, [searchTerm]);

  const loadCards = async (reset = false) => {
    if (reset) {
      setLoading(true);
      setCards([]);
      setLastDoc(null);
      setHasMore(true);
    } else {
      setLoadingMore(true);
    }

    try {
      let cardsQuery = collection(db, 'cards');
      let constraints = [
        where('isPublic', '==', true)
      ];

      // Add sport filter
      if (filter !== 'all') {
        constraints.push(where('sport', '==', filter));
      }

      // Add search filter (search in player names)
      if (searchTerm) {
        // Note: Firestore doesn't support full-text search, so we'll do a simple startsWith query
        // In a real app, you might want to use Algolia or similar for better search
        constraints.push(where('playerName', '>=', searchTerm));
        constraints.push(where('playerName', '<=', searchTerm + '\uf8ff'));
      }

      // Add sorting
      let orderField = 'createdAt';
      let orderDirection = 'desc';
      
      switch (sortBy) {
        case 'oldest':
          orderDirection = 'asc';
          break;
        case 'rating':
          orderField = 'stats.overall';
          orderDirection = 'desc';
          break;
        case 'rarity':
          orderField = 'cardValue';
          orderDirection = 'desc';
          break;
        default:
          orderField = 'createdAt';
          orderDirection = 'desc';
      }

      constraints.push(orderBy(orderField, orderDirection));
      constraints.push(limit(CARDS_PER_PAGE));

      // Add pagination
      if (!reset && lastDoc) {
        constraints.push(startAfter(lastDoc));
      }

      cardsQuery = query(cardsQuery, ...constraints);
      const querySnapshot = await getDocs(cardsQuery);
      
      if (querySnapshot.empty) {
        setHasMore(false);
        return;
      }

      const newCards = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      if (reset) {
        setCards(newCards);
      } else {
        setCards(prev => [...prev, ...newCards]);
      }

      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setHasMore(querySnapshot.docs.length === CARDS_PER_PAGE);

    } catch (error) {
      console.error('Error loading cards:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      loadCards(false);
    }
  };

  const getRarityBadgeColor = (rarity) => {
    const colors = {
      'Common': 'bg-gray-100 text-gray-800',
      'Uncommon': 'bg-green-100 text-green-800',
      'Rare': 'bg-blue-100 text-blue-800',
      'Epic': 'bg-purple-100 text-purple-800',
      'Legendary': 'bg-yellow-100 text-yellow-800'
    };
    return colors[rarity] || colors['Common'];
  };

  return (
    <>
      <Head>
        <title>Gallery - SQUADFIELD</title>
        <meta name="description" content="Browse amazing sports cards created by the SQUADFIELD community." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-heading font-bold text-gradient">
                  SQUADFIELD
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                {currentUser ? (
                  <>
                    <Link href="/dashboard" className="btn-secondary">
                      Dashboard
                    </Link>
                    <Link href="/upload" className="btn-primary">
                      Create Card
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="btn-secondary">
                      Sign In
                    </Link>
                    <Link href="/login" className="btn-primary">
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-secondary-900 mb-4">
              Community Gallery
            </h1>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Discover amazing sports cards created by our community. Get inspired and create your own!
            </p>
          </div>

          {/* Filters and Search */}
          <div className="card p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              {/* Search */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Search Players
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by player name..."
                    className="input-field pl-10"
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Sport Filter */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Sport
                </label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Sports</option>
                  <option value="football">Football</option>
                  <option value="basketball">Basketball</option>
                  <option value="soccer">Soccer</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="rating">Highest Rating</option>
                  <option value="rarity">Highest Value</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          {!loading && (
            <div className="mb-6">
              <p className="text-secondary-600">
                {cards.length} card{cards.length !== 1 ? 's' : ''} found
                {filter !== 'all' && ` in ${filter}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>
          )}

          {/* Cards Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : cards.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {cards.map((card) => (
                  <div key={card.id} className="group">
                    <div className="card p-4 hover:shadow-card-hover transition-shadow duration-300">
                      {/* Card Preview */}
                      <div className="mb-4">
                        <CardPreview
                          cardData={card}
                          playerImage={card.originalImageUrl}
                          showStats={false}
                          className="h-full"
                        />
                      </div>

                      {/* Card Info */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-heading font-semibold text-secondary-900 truncate">
                              {card.playerName}
                            </h3>
                            <p className="text-sm text-secondary-600">
                              {card.position} • {card.sport.charAt(0).toUpperCase() + card.sport.slice(1)}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-secondary-900">
                              {card.stats.overall}
                            </div>
                            <div className="text-xs text-secondary-500">
                              Overall
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityBadgeColor(card.rarity.name)}`}>
                            {card.rarity.name}
                          </span>
                          <span className="text-sm text-secondary-600">
                            {card.cardValue} pts
                          </span>
                        </div>

                        <div className="flex justify-between items-center text-xs text-secondary-500">
                          <span>By {card.userName}</span>
                          <span>{new Date(card.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Hover Actions */}
                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="flex space-x-2">
                          <button className="flex-1 btn-secondary text-sm py-2">
                            View Details
                          </button>
                          <button className="px-3 py-2 text-secondary-600 hover:text-red-600 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingMore ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                        Loading...
                      </>
                    ) : (
                      'Load More Cards'
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-secondary-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-lg font-medium text-secondary-900 mb-2">No cards found</h3>
              <p className="text-secondary-600 mb-6">
                {searchTerm || filter !== 'all' 
                  ? 'Try adjusting your search or filters.'
                  : 'Be the first to create and share a card!'
                }
              </p>
              {currentUser ? (
                <Link href="/upload" className="btn-primary">
                  Create Your First Card
                </Link>
              ) : (
                <Link href="/login" className="btn-primary">
                  Sign Up to Create Cards
                </Link>
              )}
            </div>
          )}
        </div>

        {/* CTA Section */}
        {!currentUser && cards.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-heading font-bold text-secondary-900 mb-4">
                Ready to Create Your Own Cards?
              </h2>
              <p className="text-lg text-secondary-600 mb-8">
                Join our community and start creating amazing sports cards today.
              </p>
              <Link href="/login" className="btn-primary text-lg px-8 py-3">
                Get Started Free
              </Link>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
