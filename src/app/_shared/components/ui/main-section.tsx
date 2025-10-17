import Link from 'next/link';
import { utilities } from '@/app/_shared/lib/mock';
import { ArrowRight } from 'lucide-react';
import '@/app/_shared/styles/animations.css';

type UtilityCard = (typeof utilities)[number];

export default function MainSection() {
  return (
    <section className="space-y-16 px-4 py-20 sm:px-6 md:px-12 lg:px-24 xl:px-48 2xl:px-64">
      {/* Hero Section */}
      <div className="space-y-6">
        <div>
          <h1 className="mb-6 max-w-4xl text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
            {'Practical Utilities for Daily Life'
              .split(' ')
              .map((char, index) => (
                <span
                  className="animate-text-reveal mr-[0.3ch] inline-block"
                  style={{ animationDelay: `${index * 0.03}s` }}
                  key={`${char}-${index}`}>
                  {char}
                </span>
              ))}
          </h1>
        </div>
        <p className="animate-text-reveal max-w-2xl text-base text-gray-400 sm:text-lg">
          Discover a collection of powerful, easy-to-use utilities designed to solve real-life problems. From splitting
          expenses to converting units, we&rsquo;ve got tools to make your life simpler and more productive.
        </p>
      </div>

      {/* Utilities Grid */}
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {utilities.map((utility: UtilityCard) => (
          <Link
            key={utility.id}
            href={utility.href as any} // eslint-disable-line @typescript-eslint/no-explicit-any
            className="utility-card group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black p-8 transition-all">
            {/* Gradient line at bottom */}
            <div className="gradient-line" />

            {/* Content */}
            <div className="relative space-y-4">
              {/* Icon and Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="utility-icon text-5xl">{utility.icon}</div>
                  <h2 className="text-2xl font-bold text-white sm:text-3xl">{utility.name}</h2>
                </div>
                <ArrowRight className="arrow-icon h-6 w-6 text-gray-600 group-hover:text-blue-400" />
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400 sm:text-base">{utility.description}</p>

              {/* Features List */}
              <div className="space-y-2 pt-4">
                <p className="text-xs font-semibold text-gray-500 uppercase">Features</p>
                <ul className="space-y-1">
                  {utility.features.map((feature, idx) => (
                    <li key={idx} className="feature-item flex items-center gap-2 text-xs text-gray-400 sm:text-sm">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <button className="explore-button inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/30">
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Call to Action */}
      <div className="cta-section rounded-2xl border border-gray-800 bg-gradient-to-r from-blue-500/10 to-purple-600/10 p-8 sm:p-12">
        <div className="space-y-4 text-center">
          <h3 className="text-2xl font-bold text-white sm:text-3xl">More utilities coming soon</h3>
          <p className="mx-auto max-w-2xl text-sm text-gray-400 sm:text-base">
            We&rsquo;re constantly building new tools to help you solve everyday problems. Stay tuned for more exciting
            utilities!
          </p>
        </div>
      </div>
    </section>
  );
}


