import { useState, useEffect } from 'react';

const tripTypes = ['Business', 'Friends', 'Honeymoon', 'Family', 'Solo', 'Adventure', 'Custom'];
const roomTypes = ['Standard', 'Standard King', 'Deluxe', 'Deluxe Suite', 'Premier Room', 'Villa with Pool', 'Penthouse', 'Suite', 'Studio', 'Other'];

const emptyForm = {
  hotelName: '',
  location: '',
  rating: 0,
  tripType: '',
  customTripType: '',
  checkInDate: '',
  checkOutDate: '',
  pricePerNight: '',
  roomType: '',
  notes: ''
};

export default function ReviewFormModal({ show, onClose, onSave, editReview }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [hoverRating, setHoverRating] = useState(0);

  const isEdit = !!editReview;

  useEffect(() => {
    if (editReview) {
      const isCustomType = editReview.tripType && !['Business', 'Friend', 'Honeymoon', 'Family', 'Solo', 'Adventure'].includes(editReview.tripType);
      setForm({
        hotelName: editReview.hotelName || '',
        location: editReview.location || '',
        rating: editReview.rating || 0,
        tripType: isCustomType ? 'Custom' : (editReview.tripType || ''),
        customTripType: isCustomType ? editReview.tripType : '',
        checkInDate: editReview.checkInDate || '',
        checkOutDate: editReview.checkOutDate || '',
        pricePerNight: editReview.pricePerNight || '',
        roomType: editReview.roomType || '',
        notes: editReview.notes || ''
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
    setHoverRating(0);
  }, [editReview, show]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.hotelName.trim()) newErrors.hotelName = 'Hotel name is required';
    if (!form.location.trim()) newErrors.location = 'Location is required';
    if (form.rating === 0) newErrors.rating = 'Please select a rating';
    if (!form.checkInDate) newErrors.checkInDate = 'Check-in date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      ...form,
      tripType: form.tripType === 'Custom' ? form.customTripType : form.tripType,
      customTripType: undefined,
      pricePerNight: form.pricePerNight ? Number(form.pricePerNight) : null
    };

    onSave(data);
    setForm(emptyForm);
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'var(--modal-overlay)', backdropFilter: 'blur(4px)' }} id="review-form-modal">
      <div className="modal-dialog modal-dialog-centered modal-lg modal-custom">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">
              <i className={`bi ${isEdit ? 'bi-pencil-square' : 'bi-plus-circle'} me-2`} style={{ color: 'var(--accent-primary)' }}></i>
              {isEdit ? 'Edit Review' : 'Add New Review'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} id="btn-close-form"></button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row g-3">
                {/* Hotel Name */}
                <div className="col-md-6">
                  <label className="form-label form-label-custom">Hotel Name *</label>
                  <input
                    type="text"
                    className={`form-control form-control-custom ${errors.hotelName ? 'border-danger' : ''}`}
                    placeholder="e.g., Taj Mahal Palace"
                    value={form.hotelName}
                    onChange={(e) => handleChange('hotelName', e.target.value)}
                    id="input-hotel-name"
                  />
                  {errors.hotelName && <div className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>{errors.hotelName}</div>}
                </div>

                {/* Location */}
                <div className="col-md-6">
                  <label className="form-label form-label-custom">Location *</label>
                  <input
                    type="text"
                    className={`form-control form-control-custom ${errors.location ? 'border-danger' : ''}`}
                    placeholder="e.g., Mumbai, India"
                    value={form.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    id="input-location"
                  />
                  {errors.location && <div className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>{errors.location}</div>}
                </div>

                {/* Rating */}
                <div className="col-md-6">
                  <label className="form-label form-label-custom">Your Rating *</label>
                  <div className="star-rating-input">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        className={`star-btn ${star <= (hoverRating || form.rating) ? 'active' : ''}`}
                        onClick={() => handleChange('rating', star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        id={`star-${star}`}
                      >
                        <i className={`bi ${star <= (hoverRating || form.rating) ? 'bi-star-fill' : 'bi-star'}`}></i>
                      </button>
                    ))}
                    {form.rating > 0 && (
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-amber)', fontWeight: 600, alignSelf: 'center', marginLeft: 8 }}>
                        {form.rating}/5
                      </span>
                    )}
                  </div>
                  {errors.rating && <div className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>{errors.rating}</div>}
                </div>

                {/* Trip Type */}
                <div className="col-md-6">
                  <label className="form-label form-label-custom">Trip Type</label>
                  <select
                    className="form-select form-control-custom"
                    value={form.tripType}
                    onChange={(e) => handleChange('tripType', e.target.value)}
                    id="select-trip-type"
                  >
                    <option value="">Select trip type</option>
                    {tripTypes.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Custom Trip Type Input */}
                {form.tripType === 'Custom' && (
                  <div className="col-md-6">
                    <label className="form-label form-label-custom">Custom Trip Type</label>
                    <input
                      type="text"
                      className="form-control form-control-custom"
                      placeholder="e.g., Corporate Event, Road Trip"
                      value={form.customTripType}
                      onChange={(e) => handleChange('customTripType', e.target.value)}
                      id="input-custom-trip-type"
                    />
                  </div>
                )}

                {/* Check-in Date */}
                <div className="col-md-6 col-6">
                  <label className="form-label form-label-custom">Check-in Date *</label>
                  <input
                    type="date"
                    className={`form-control form-control-custom ${errors.checkInDate ? 'border-danger' : ''}`}
                    value={form.checkInDate}
                    onChange={(e) => handleChange('checkInDate', e.target.value)}
                    id="input-checkin"
                  />
                  {errors.checkInDate && <div className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>{errors.checkInDate}</div>}
                </div>

                {/* Check-out Date */}
                <div className="col-md-6 col-6">
                  <label className="form-label form-label-custom">Check-out Date</label>
                  <input
                    type="date"
                    className={`form-control form-control-custom`}
                    value={form.checkOutDate}
                    onChange={(e) => handleChange('checkOutDate', e.target.value)}
                    min={form.checkInDate}
                    id="input-checkout"
                  />
                </div>

                {/* Price Per Night */}
                <div className="col-md-6">
                  <label className="form-label form-label-custom">Price Per Night (₹)</label>
                  <input
                    type="number"
                    className="form-control form-control-custom"
                    placeholder="e.g., 8500"
                    value={form.pricePerNight}
                    onChange={(e) => handleChange('pricePerNight', e.target.value)}
                    min="0"
                    id="input-price"
                  />
                </div>

                {/* Room Type */}
                <div className="col-md-6">
                  <label className="form-label form-label-custom">Room Type</label>
                  <select
                    className="form-select form-control-custom"
                    value={form.roomType}
                    onChange={(e) => handleChange('roomType', e.target.value)}
                    id="select-room-type"
                  >
                    <option value="">Select room type</option>
                    {roomTypes.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Notes */}
                <div className="col-12">
                  <label className="form-label form-label-custom">Private Notes</label>
                  <textarea
                    className="form-control form-control-custom"
                    rows="4"
                    placeholder="Write your private notes about this stay — what you loved, what could be improved, tips for next time..."
                    value={form.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    id="input-notes"
                    style={{ resize: 'vertical' }}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-glass" onClick={onClose} id="btn-cancel-form">
                Cancel
              </button>
              <button type="submit" className="btn btn-gradient" id="btn-save-form">
                <i className={`bi ${isEdit ? 'bi-check-lg' : 'bi-plus-lg'} me-2`}></i>
                {isEdit ? 'Update Review' : 'Save Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
