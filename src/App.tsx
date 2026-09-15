import { Navigation, Hero, Experience, Skills, Projects, Contact, AnimatedBackground } from './components';

function App() {
  return (
    <div className="w-full overflow-hidden bg-[#050816] relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <div id="contact">
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default App;
