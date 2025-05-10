
const stats = [
  { value: "50+", label: "Research Projects" },
  { value: "25", label: "Partner Hospitals" },
  { value: "10k+", label: "Patients Served" },
  { value: "5", label: "Countries" }
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-healthDarkBlue text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Impact in Numbers</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-4">
              <div className="text-4xl md:text-5xl font-bold text-healthTeal mb-2">{stat.value}</div>
              <div className="text-lg text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
