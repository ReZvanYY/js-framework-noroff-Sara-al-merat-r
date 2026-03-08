import { useState } from 'react';

// 1. Define the shapes for our data and errors
interface ContactFormData {
  fullName: string;
  subject: string;
  email: string;
  body: string;
}

interface FormErrors {
  fullName?: string;
  subject?: string;
  email?: string;
  body?: string;
}

function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    subject: '',
    email: '',
    body: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 2. Handle input changes and clear errors as the user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear the specific error when they start typing again
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // 3. The Validation Logic
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'First name must be at least 3 characters.';
      isValid = false;
    }

    if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.';
      isValid = false;
    }

    // Standard email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (formData.body.trim().length < 3) {
      newErrors.body = 'Message must be at least 3 characters.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 4. Handle the final submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Assignment requirement: Log the data to the console
      console.log('Form submitted successfully with data:', formData);
      
      setIsSubmitted(true);
      
      // Reset form after submission
      setFormData({
        fullName: '',
        subject: '',
        email: '',
        body: '',
      });

      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto py-8">
      
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-indigo-950 tracking-tight mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600">
          Have a question or run into a problem? Drop us a line and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="w-full bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-12 shadow-sm">
        
        {isSubmitted && (
          <div className="mb-8 p-4 bg-green-100 border-2 border-green-500 rounded-xl flex items-center gap-3 text-green-800 font-bold">
            <span className="text-2xl">✓</span>
            <p>Thank you for reaching out! Your message has been sent.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Full Name Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="font-bold text-indigo-950">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Jane Doe"
              className={`px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-4 ${
                errors.fullName 
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50' 
                  : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100 bg-gray-50'
              }`}
            />
            {errors.fullName && <p className="text-red-500 text-sm font-bold">{errors.fullName}</p>}
          </div>

          {/* Subject Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="font-bold text-indigo-950">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Order Inquiry"
              className={`px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-4 ${
                errors.subject 
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50' 
                  : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100 bg-gray-50'
              }`}
            />
            {errors.subject && <p className="text-red-500 text-sm font-bold">{errors.subject}</p>}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-bold text-indigo-950">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              className={`px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-4 ${
                errors.email 
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50' 
                  : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100 bg-gray-50'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm font-bold">{errors.email}</p>}
          </div>

          {/* Body/Message Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="body" className="font-bold text-indigo-950">
              Message
            </label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              rows={5}
              placeholder="How can we help you today?"
              className={`px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-4 resize-none ${
                errors.body 
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50' 
                  : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100 bg-gray-50'
              }`}
            />
            {errors.body && <p className="text-red-500 text-sm font-bold">{errors.body}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full bg-orange-500 text-white px-8 py-4 rounded-xl text-lg font-black hover:bg-indigo-900 transition-colors shadow-md hover:shadow-xl active:scale-95"
          >
            Send Message
          </button>

        </form>
      </div>
    </div>
  );
}

export default ContactPage;