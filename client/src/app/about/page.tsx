'use client';
import React from 'react';
import Link from 'next/link';
import { 
  EyeIcon, 
  CubeIcon, 
  SparklesIcon, 
  UserGroupIcon, 
  LightBulbIcon, 
  HeartIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import Breadcrumb from '../../components/Breadcrumb';

const teamMembers = [
  {
    name: 'Nguyễn Văn An',
    role: 'CEO & Founder',
    image: '/api/placeholder/150/150',
    description: 'Chuyên gia công nghệ với 15 năm kinh nghiệm trong lĩnh vực thương mại điện tử.'
  },
  {
    name: 'Trần Thị Bình',
    role: 'CTO',
    image: '/api/placeholder/150/150',
    description: 'Kỹ sư phần mềm hàng đầu chuyên về công nghệ 3D và thực tế ảo.'
  },
  {
    name: 'Lê Minh Cường',
    role: 'Head of Design',
    image: '/api/placeholder/150/150',
    description: 'Nhà thiết kế UX/UI với niềm đam mê tạo ra trải nghiệm người dùng tuyệt vời.'
  },
  {
    name: 'Phạm Thu Dung',
    role: 'Marketing Director',
    image: '/api/placeholder/150/150',
    description: 'Chuyên gia marketing số với kinh nghiệm phát triển thương hiệu toàn cầu.'
  }
];

const technologies = [
  {
    name: 'WebGL & Three.js',
    description: 'Công nghệ render 3D hiệu suất cao trực tiếp trên trình duyệt',
    icon: CubeIcon
  },
  {
    name: 'AI & Machine Learning',
    description: 'Thuật toán thông minh để tối ưu hóa trải nghiệm mua sắm',
    icon: LightBulbIcon
  },
  {
    name: 'Cloud Computing',
    description: 'Hạ tầng đám mây đảm bảo tốc độ và độ tin cậy cao',
    icon: SparklesIcon
  },
  {
    name: 'Mobile Optimization',
    description: 'Tối ưu hóa hoàn hảo cho mọi thiết bị di động',
    icon: EyeIcon
  }
];

const values = [
  {
    title: 'Đổi mới sáng tạo',
    description: 'Chúng tôi luôn tiên phong trong việc áp dụng công nghệ mới nhất để mang đến trải nghiệm tốt nhất.',
    icon: LightBulbIcon
  },
  {
    title: 'Chất lượng hàng đầu',
    description: 'Mọi sản phẩm và dịch vụ đều được kiểm tra kỹ lưỡng để đảm bảo chất lượng cao nhất.',
    icon: CheckCircleIcon
  },
  {
    title: 'Khách hàng là trung tâm',
    description: 'Chúng tôi đặt nhu cầu và trải nghiệm của khách hàng lên hàng đầu trong mọi quyết định.',
    icon: HeartIcon
  },
  {
    title: 'Minh bạch & Tin cậy',
    description: 'Xây dựng mối quan hệ dựa trên sự tin tưởng và minh bạch trong mọi giao dịch.',
    icon: UserGroupIcon
  }
];

const milestones = [
  {
    year: '2020',
    title: 'Thành lập công ty',
    description: 'Khởi đầu với tầm nhìn cách mạng hóa thương mại điện tử'
  },
  {
    year: '2021',
    title: 'Ra mắt công nghệ 3D',
    description: 'Phát triển thành công nền tảng xem sản phẩm 3D đầu tiên'
  },
  {
    year: '2022',
    title: '10,000+ khách hàng',
    description: 'Đạt mốc 10,000 khách hàng tin tưởng sử dụng dịch vụ'
  },
  {
    year: '2023',
    title: 'Mở rộng quốc tế',
    description: 'Mở rộng dịch vụ ra thị trường Đông Nam Á'
  },
  {
    year: '2024',
    title: 'AI Integration',
    description: 'Tích hợp AI để cá nhân hóa trải nghiệm mua sắm'
  }
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb 
            items={[{ label: 'Về chúng tôi', current: true }]} 
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            Về chúng tôi
          </h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
            Chúng tôi đang cách mạng hóa cách thức mua sắm trực tuyến bằng công nghệ 3D tiên tiến, 
            mang đến trải nghiệm chân thực và tương tác như chưa từng có.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                Sứ mệnh của chúng tôi
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Chúng tôi tin rằng mua sắm trực tuyến không chỉ là việc xem hình ảnh và đọc mô tả. 
                Khách hàng xứng đáng có được trải nghiệm chân thực, có thể tương tác và khám phá 
                sản phẩm một cách đầy đủ trước khi đưa ra quyết định mua hàng.
              </p>
              <p className="text-lg text-gray-600">
                Với công nghệ 3D tiên tiến, chúng tôi đang xóa bỏ khoảng cách giữa mua sắm trực tuyến 
                và trải nghiệm thực tế, giúp khách hàng cảm thấy tự tin và hài lòng với mỗi lựa chọn.
              </p>
            </div>
            <div className="relative">
              <img
                src="/api/placeholder/600/400"
                alt="Our Mission"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-blue-600 bg-opacity-20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Hành trình phát triển
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Từ ý tưởng đến hiện thực - câu chuyện về sự phát triển của chúng tôi
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-blue-600"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}>
                  <div className={`w-5/12 ${
                    index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'
                  }`}>
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Công nghệ tiên tiến
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Chúng tôi sử dụng những công nghệ hàng đầu để mang đến trải nghiệm tốt nhất
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {tech.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {tech.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Đội ngũ của chúng tôi
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Những con người tài năng đang xây dựng tương lai của thương mại điện tử
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Giá trị cốt lõi
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Những nguyên tắc định hướng mọi hoạt động của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-lg p-3 flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">50,000+</div>
              <div className="text-blue-100">Khách hàng hài lòng</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">1,000+</div>
              <div className="text-blue-100">Sản phẩm 3D</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-blue-100">Thời gian hoạt động</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-100">Hỗ trợ khách hàng</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Sẵn sàng trải nghiệm tương lai?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Tham gia cùng chúng tôi trong hành trình cách mạng hóa thương mại điện tử
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Khám phá sản phẩm
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200"
            >
              Liên hệ với chúng tôi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}