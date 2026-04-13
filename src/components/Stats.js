// Stats.js
// 4-stat counter bar, placeholder X+ values until real numbers exist.
// Update the values below or wire them to a config when real metrics land.
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Award, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: Globe,
    value: '30+',
    label: 'Countries Served',
  },
  {
    icon: Users,
    value: '10,000+',
    label: 'Cases Handled',
  },
  {
    icon: Award,
    value: '12+',
    label: 'Years of Experience',
  },
  {
    icon: TrendingUp,
    value: '97%',
    label: 'Success Rate',
  },
];

const Stats = () => {
  return (
    <section className="bg-white py-12 md:py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-acGold/10 mb-4">
                  <Icon
                    size={26}
                    className="text-acblue"
                    strokeWidth={2}
                  />
                </div>
                <div className="text-4xl md:text-5xl font-black font-inter text-acBlack mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-acGray uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
