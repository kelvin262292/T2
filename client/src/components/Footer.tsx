'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  LinkedinIcon
} from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    // TODO: Implement newsletter subscription
    setTimeout(() => {
      console.log('Newsletter subscription:', email);
      setEmail('');
      setIsSubscribing(false);
      alert('Cảm ơn bạn đã đăng ký nhận tin!');
    }, 1000);
  };

  const productCategories = [
    { name: 'Điện tử', href: '/categories/electronics' },
    { name: 'Thời trang', href: '/categories/fashion' },
    { name: 'Nội thất', href: '/categories/furniture' },
    { name: 'Thể thao', href: '/categories/sports' },
    { name: 'Sách', href: '/categories/books' },
    { name: 'Đồ chơi', href: '/categories/toys' },
  ];

  const supportLinks = [
    { name: 'Trung tâm hỗ trợ', href: '/support' },
    { name: 'Hướng dẫn mua hàng', href: '/guide' },
    { name: 'Chính sách đổi trả', href: '/return-policy' },
    { name: 'Chính sách bảo mật', href: '/privacy-policy' },
    { name: 'Điều khoản sử dụng', href: '/terms' },
    { name: 'FAQ', href: '/faq' },
  ];

  const companyLinks = [
    { name: 'Về chúng tôi', href: '/about' },
    { name: 'Tuyển dụng', href: '/careers' },
    { name: 'Tin tức', href: '/news' },
    { name: 'Đối tác', href: '/partners' },
    { name: 'Nhà đầu tư', href: '/investors' },
    { name: 'Liên hệ', href: '/contact' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: FacebookIcon, href: 'https://facebook.com', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: TwitterIcon, href: 'https://twitter.com', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com', color: 'hover:text-pink-600' },
    { name: 'YouTube', icon: YoutubeIcon, href: 'https://youtube.com', color: 'hover:text-red-600' },
    { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://linkedin.com', color: 'hover:text-blue-700' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-6">
            <div>
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">3D</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">3D E-Commerce</h3>
                  <p className="text-sm text-gray-400">Trải nghiệm mua sắm 3D</p>
                </div>
              </Link>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Nền tảng thương mại điện tử tiên tiến với công nghệ 3D, 
              mang đến trải nghiệm mua sắm tương tác và chân thực nhất.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <MapPinIcon className="h-4 w-4 text-blue-400" />
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <PhoneIcon className="h-4 w-4 text-blue-400" />
                <span>+84 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <EnvelopeIcon className="h-4 w-4 text-blue-400" />
                <span>support@3decommerce.com</span>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Danh mục sản phẩm</h4>
            <ul className="space-y-3">
              {productCategories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-200 flex items-center group"
                  >
                    <span>{category.name}</span>
                    <ArrowRightIcon className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Hỗ trợ khách hàng</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-200 flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ArrowRightIcon className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Nhận tin khuyến mãi</h4>
            <p className="text-gray-300 text-sm mb-4">
              Đăng ký để nhận thông tin về sản phẩm mới và ưu đãi đặc biệt.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                disabled={isSubscribing}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {isSubscribing ? (
                  <span>Đang đăng ký...</span>
                ) : (
                  <>
                    <span>Đăng ký</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Social Media Links */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3">Theo dõi chúng tôi</h5>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-400 ${social.color} transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800`}
                      aria-label={social.name}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 3D E-Commerce. Tất cả quyền được bảo lưu.
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              {companyLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;