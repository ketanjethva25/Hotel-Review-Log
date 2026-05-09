// Sample seed data for demonstration (prices in ₹)
const sampleReviews = [
  {
    id: '1',
    hotelName: 'Taj Mahal Palace',
    location: 'Mumbai, India',
    rating: 5,
    tripType: 'Business',
    checkInDate: '2025-11-10',
    checkOutDate: '2025-11-14',
    pricePerNight: 28000,
    roomType: 'Deluxe Suite',
    notes: 'Absolutely stunning heritage property overlooking the Gateway of India. The service was impeccable — from the moment we arrived, every detail was taken care of. The room had a breathtaking sea-facing view. The spa was world-class and Wasabi served some of the finest Japanese cuisine I have ever tasted in India.',
    createdAt: '2025-11-15T10:30:00Z',
    updatedAt: '2025-11-15T10:30:00Z'
  },
  {
    id: '2',
    hotelName: 'Aman Tokyo',
    location: 'Tokyo, Japan',
    rating: 5,
    tripType: 'Honeymoon',
    checkInDate: '2025-09-20',
    checkOutDate: '2025-09-25',
    pricePerNight: 56000,
    roomType: 'Premier Room',
    notes: 'A serene oasis in the heart of bustling Tokyo. The minimalist Japanese design combined with modern luxury is executed perfectly. The onsen-style spa was my highlight. Breakfast at the Italian restaurant was surprisingly excellent. The staff anticipated every need before I even asked.',
    createdAt: '2025-09-26T08:00:00Z',
    updatedAt: '2025-09-26T08:00:00Z'
  },
  {
    id: '3',
    hotelName: 'The Oberoi Udaivilas',
    location: 'Udaipur, India',
    rating: 4,
    tripType: 'Friends',
    checkInDate: '2025-07-01',
    checkOutDate: '2025-07-08',
    pricePerNight: 42000,
    roomType: 'Villa with Pool',
    notes: 'The private villa with a semi-private pool overlooking Lake Pichola was magical. Perfect honeymoon destination. The only minor issue was the summer heat which limited outdoor activities. The heritage walk and boat ride organized by the hotel were wonderful experiences. Udaimahal restaurant was outstanding.',
    createdAt: '2025-07-10T14:20:00Z',
    updatedAt: '2025-07-10T14:20:00Z'
  },
  {
    id: '4',
    hotelName: 'The Leela Palace',
    location: 'New Delhi, India',
    rating: 4,
    tripType: 'Family',
    checkInDate: '2025-05-15',
    checkOutDate: '2025-05-18',
    pricePerNight: 22000,
    roomType: 'Deluxe',
    notes: 'Classic luxury in the heart of Lutyens\' Delhi. The interiors are stunning with a blend of Mughal and contemporary design. The Royal Club lounge was worth every penny. Le Cirque served an unforgettable Italian dinner. Location is perfect for Diplomatic Enclave meetings.',
    createdAt: '2025-05-19T09:00:00Z',
    updatedAt: '2025-05-19T09:00:00Z'
  },
  {
    id: '5',
    hotelName: 'ITC Maurya',
    location: 'New Delhi, India',
    rating: 3,
    tripType: 'Business',
    checkInDate: '2025-03-08',
    checkOutDate: '2025-03-11',
    pricePerNight: 15000,
    roomType: 'Standard King',
    notes: 'Solid business hotel with a great location near the airport and government offices. Room was clean and functional but nothing extraordinary. Bukhara restaurant was the highlight — possibly the best dal makhani in the world. Breakfast buffet at Pavilion was above average. Good value for business travelers.',
    createdAt: '2025-03-12T16:45:00Z',
    updatedAt: '2025-03-12T16:45:00Z'
  }
];

export function getReviews() {
  const stored = localStorage.getItem('hotelReviews');
  if (stored) {
    return JSON.parse(stored);
  }
  // Seed with sample data on first load
  localStorage.setItem('hotelReviews', JSON.stringify(sampleReviews));
  return sampleReviews;
}

export function saveReviews(reviews) {
  localStorage.setItem('hotelReviews', JSON.stringify(reviews));
}

export function addReview(review) {
  const reviews = getReviews();
  const newReview = {
    ...review,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  reviews.unshift(newReview);
  saveReviews(reviews);
  return reviews;
}

export function updateReview(id, updatedData) {
  const reviews = getReviews();
  const index = reviews.findIndex(r => r.id === id);
  if (index !== -1) {
    reviews[index] = {
      ...reviews[index],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    saveReviews(reviews);
  }
  return reviews;
}

export function deleteReview(id) {
  let reviews = getReviews();
  reviews = reviews.filter(r => r.id !== id);
  saveReviews(reviews);
  return reviews;
}

export function getStats(reviews) {
  const total = reviews.length;
  const avgRating = total > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1) : '0.0';
  const countries = new Set(reviews.map(r => {
    if (!r.location) return null;
    const parts = r.location.split(',');
    return parts[parts.length - 1]?.trim();
  }).filter(Boolean));
  const totalNights = reviews.reduce((sum, r) => {
    if (r.checkInDate && r.checkOutDate) {
      const diff = (new Date(r.checkOutDate) - new Date(r.checkInDate)) / (1000 * 60 * 60 * 24);
      return sum + Math.max(0, diff);
    }
    return sum;
  }, 0);
  return { total, avgRating, countries: countries.size, totalNights };
}
