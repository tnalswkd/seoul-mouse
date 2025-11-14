/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  // 프로덕션 환경에서 불필요한 파일 확장자 접근 방지
  trailingSlash: false,
  // 정적 HTML 내보내기 설정
  output: "export",
  images: {
    unoptimized: true,
  },
  devIndicators: false,
};

module.exports = nextConfig;
