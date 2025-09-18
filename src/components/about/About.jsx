import React from "react";

const About = () => {
  return (
    <section id="about" className="py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-8">About Me</h2>
      <div className="max-w-3xl mx-auto grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-semibold text-pink-400">Who I Am</h3>
          <p className="text-gray-300 mt-2">
            I’m a passionate student in Data Science & Web Development based in Kigali.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-pink-400">What I Do</h3>
          <p className="text-gray-300 mt-2">
            I build modern web apps and analyze data to create smart solutions.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-pink-400">My Mission</h3>
          <p className="text-gray-300 mt-2">
            To use technology and data to solve real-world problems and inspire innovation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
