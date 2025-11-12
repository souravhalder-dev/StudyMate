import HeroSection from "../HeroSection/HeroSection";
import TopStudyPartners from "../Pages/TopStudyPartners";
import HowItWorks from "../Pages/HowItWorks";
import Testimonials from "../Pages/Testimonials";
import FAQList from "../Pages/FAQList";
import useAuth from "../Hooks/useAuth";
import LoadingPage from "../Pages/LoadingPage";

const Home = () => {
  const { loading } = useAuth();
  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div>
      <HeroSection />
      <TopStudyPartners />
      <HowItWorks />
      <Testimonials />
      <FAQList />
    </div>
  );
};

export default Home;
