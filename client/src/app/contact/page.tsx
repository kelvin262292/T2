'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Breadcrumb from '../../components/Breadcrumb';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const contactInfo = [
  {
    icon: PhoneIcon,
    title: 'Điện thoại',
    details: ['+84 (028) 1234 5678', '+84 (024) 8765 4321'],
    description: 'Thứ 2 - Chủ nhật, 8:00 - 22:00'
  },
  {
    icon: EnvelopeIcon,
    title: 'Email',
    details: ['support@3dshop.vn', 'sales@3dshop.vn'],
    description: 'Phản hồi trong vòng 24 giờ'
  },
  {
    icon: MapPinIcon,
    title: 'Địa chỉ',
    details: ['123 Đường Nguyễn Huệ, Quận 1', 'TP. Hồ Chí Minh, Việt Nam'],
    description: 'Văn phòng chính'
  },
  {
    icon: ClockIcon,
    title: 'Giờ làm việc',
    details: ['Thứ 2 - Thứ 6: 8:00 - 18:00', 'Thứ 7 - CN: 9:00 - 17:00'],
    description: 'Múi giờ Việt Nam (GMT+7)'
  }
];

const faqs = [
  {
    question: 'Làm thế nào để xem sản phẩm 3D?',
    answer: 'Chỉ cần click vào bất kỳ sản phẩm nào có biểu tượng 3D. Bạn có thể xoay, phóng to và tùy chỉnh màu sắc trực tiếp trên trình duyệt.'
  },
  {
    question: 'Tôi có thể đổi trả sản phẩm không?',
    answer: 'Có, chúng tôi hỗ trợ đổi trả trong vòng 30 ngày kể từ ngày nhận hàng với điều kiện sản phẩm còn nguyên vẹn.'
  },
  {
    question: 'Phí vận chuyển được tính như thế nào?',
    answer: 'Miễn phí vận chuyển cho đơn hàng trên 500.000₫. Đơn hàng dưới mức này sẽ có phí vận chuyển 30.000₫.'
  },
  {
    question: 'Tôi có thể thanh toán bằng cách nào?',
    answer: 'Chúng tôi hỗ trợ thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng, ví điện tử và thanh toán khi nhận hàng.'
  },
  {
    question: 'Làm sao để theo dõi đơn hàng?',
    answer: 'Sau khi đặt hàng, bạn sẽ nhận được mã theo dõi qua email. Bạn có thể kiểm tra trạng thái đơn hàng trong tài khoản của mình.'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Vui lòng nhập chủ đề';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Vui lòng nhập nội dung tin nhắn';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Tin nhắn phải có ít nhất 10 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb 
            items={[{ label: 'Liên hệ', current: true }]} 
            className="mb-0"
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Liên hệ với chúng tôi
          </h1>
          <p className="mt-4 text-xl text-blue-100">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ để được tư vấn tốt nhất!
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600">{detail}</p>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{info.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-600 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Gửi tin nhắn cho chúng tôi
                  </h2>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Cảm ơn bạn đã liên hệ!
                    </h3>
                    <p className="text-gray-600">
                      Chúng tôi sẽ phản hồi trong vòng 24 giờ.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Gửi tin nhắn khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Họ và tên *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.name ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Nhập họ và tên"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Số điện thoại *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.phone ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Nhập số điện thoại"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.email ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Nhập địa chỉ email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Chủ đề *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.subject ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Chọn chủ đề</option>
                        <option value="support">Hỗ trợ kỹ thuật</option>
                        <option value="sales">Tư vấn bán hàng</option>
                        <option value="partnership">Hợp tác kinh doanh</option>
                        <option value="feedback">Góp ý & Phản hồi</option>
                        <option value="other">Khác</option>
                      </select>
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Nội dung tin nhắn *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.message ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Nhập nội dung tin nhắn của bạn..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Đang gửi...
                        </>
                      ) : (
                        'Gửi tin nhắn'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Map */}
            <div>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Vị trí văn phòng
                  </h3>
                  <p className="text-gray-600 mt-1">
                    123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
                  </p>
                </div>
                <div className="h-96 bg-gray-200 flex items-center justify-center">
                  {/* Placeholder for Google Maps */}
                  <div className="text-center">
                    <MapPinIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Bản đồ Google Maps</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Tích hợp Google Maps API
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <QuestionMarkCircleIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold text-gray-900">
              Câu hỏi thường gặp
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Tìm câu trả lời cho những thắc mắc phổ biến
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}