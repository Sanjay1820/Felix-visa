import React from 'react';
import { GraduationCap, Briefcase, Plane, Building2, UserPlus, CheckCircle, FileText, Globe } from 'lucide-react';

export const serviceData = {
    study: {
        title: "Study Visa",
        subtitle: "Unlock Global Education Opportunities",
        heroImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop",
        overview: "Studying abroad is a life-changing experience that opens doors to improved career prospects and personal growth. At Filix by Sagar, we guide you through every step of your international education journey.",
        benefits: [
            { title: "World-Class Education", description: "Access top-ranked universities and colleges globally." },
            { title: "Global Career", description: "Enhance your employability with an international degree." },
            { title: "Cultural Exposure", description: "Experience new cultures and broaden your worldview." },
            { title: "Post-Study Work", description: "Explore opportunities to work and settle after graduation." }
        ],
        process: [
            { step: "01", title: "Counseling", description: "In-depth discussion to understand your goals and academic background." },
            { step: "02", title: "University Selection", description: "Shortlisting the best institutions that match your profile." },
            { step: "03", title: "Application Assistance", description: "Guiding you through admission forms and SOP writing." },
            { step: "04", title: "Visa Filing", description: "Meticulous preparation and submission of your visa application." }
        ],
        faq: [
            { q: "How much gap is accepted for study visa?", a: "It varies by country and level of study. Generally, justified gaps are acceptable." },
            { q: "Do I need IELTS/TOEFL?", a: "Most english-speaking countries require proof of language proficiency, though there are exemptions." }
        ]
    },
    work: {
        title: "Work Visa",
        subtitle: "Advance Your Career Globally",
        heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
        overview: "International work experience can significantly boost your career trajectory. We assist skilled professionals in securing work permits for leading economies.",
        benefits: [
            { title: "Higher Earnings", description: "Access competitive salaries and better standard of living." },
            { title: "Skill Development", description: "Gain exposure to advanced technologies and work practices." },
            { title: "Family Benefits", description: "Bring your dependents with you to your new country of work." },
            { title: "Pathway to PR", description: "Many work visas offer a clear route to permanent residency." }
        ],
        process: [
            { step: "01", title: "Profile Evaluation", description: "Assessing your eligibility based on skills and experience." },
            { step: "02", title: "Job Search Assistance", description: "Guidance on finding valid job offers (if applicable)." },
            { step: "03", title: "Documentation", description: "Collating necessary documents including PCC and medicals." },
            { step: "04", title: "Visa Application", description: "Filing the application with the respective embassy." }
        ],
        faq: [
            { q: "Do I need a job offer first?", a: "For most work visas, a valid job offer from a sponsored employer is required." },
            { q: "How long does the process take?", a: "Processing times vary from 2 weeks to several months depending on the country and visa sub-class." }
        ]
    },
    tourist: {
        title: "Tourist Visa",
        subtitle: "Explore the World Without Boundaries",
        heroImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop",
        overview: "Planning a vacation or visiting family abroad? Our tourist visa services ensure a smooth and hassle-free application process so you can focus on your trip.",
        benefits: [
            { title: "Seamless Process", description: "We handle all the paperwork and complex forms for you." },
            { title: "High Success Rate", description: "Our expertise minimizes the risk of visa rejection." },
            { title: "Fast Processing", description: "We optimize your application for the quickest possible turnaround." },
            { title: "Itinerary Planning", description: "Assistance with travel plans and hotel bookings for visa purposes." }
        ],
        process: [
            { step: "01", title: "Document Checklist", description: "Providing a customized list of required documents." },
            { step: "02", title: "Form Filling", description: "Accurate completion of visa application forms." },
            { step: "03", title: "Appointment Booking", description: "Scheduling your biometric and interview appointments." },
            { step: "04", title: "Interview Prep", description: "Mock interviews to prepare you for common questions." }
        ],
        faq: [
            { q: "How much funds do I need to show?", a: "It depends on the destination and duration of your trip. We will guide you on the specific requirements." },
            { q: "Can I work on a tourist visa?", a: "No, employment remains strictly prohibited on a tourist/visitor visa." }
        ]
    },
    business: {
        title: "Business Visa",
        subtitle: "Expand Your Business Horizons",
        heroImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671&auto=format&fit=crop",
        overview: "For entrepreneurs and corporate executives, time is money. We provide efficient business visa solutions for meetings, conferences, and investment opportunities.",
        benefits: [
            { title: "Global Networking", description: "Connect with international partners and markets." },
            { title: "Investment Opportunities", description: "Explore new avenues for business growth and expansion." },
            { title: "Multiple Entry", description: "Flexible travel options for frequent business trips." },
            { title: "Priority Processing", description: "Expedited services for urgent business travel needs." }
        ],
        process: [
            { step: "01", title: "Requirement Analysis", description: "Understanding the purpose of your visit and business needs." },
            { step: "02", title: "Invitation Letter", description: "Guiding you on securing the necessary business invites." },
            { step: "03", title: "Financial Proofs", description: "Organizing business and personal financial documentation." },
            { step: "04", title: "Submission", description: "Handling the final submission and tracking the application." }
        ],
        faq: [
            { q: "Can I attend meetings?", a: "Yes, attending business meetings, conferences, and negotiations is permitted." },
            { q: "How long is the visa valid?", a: "Business visas can be valid from short term (3 months) to long term (10 years) depending on the country." }
        ]
    },
    pr: {
        title: "Permanent Residency",
        subtitle: "Make the World Your Home",
        heroImage: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=2670&auto=format&fit=crop",
        overview: "Securing Permanent Residency is a significant milestone. We specialize in skilled migration, family sponsorship, and investment-based PR pathways.",
        benefits: [
            { title: "Social Security", description: "Access healthcare, education, and social benefits of the host country." },
            { title: "Right to Work", description: "Work for any employer without needing specific sponsorship." },
            { title: "Path to Citizenship", description: "PR is often the first step towards acquiring full citizenship." },
            { title: "Family Security", description: "Provide a stable and secure future for your family." }
        ],
        process: [
            { step: "01", title: "Eligibility Check", description: "Comprehensive points-based assessment of your profile." },
            { step: "02", title: "Skill Assessment", description: "Getting your qualifications recognized by relevant authorities." },
            { step: "03", title: "EOI Submission", description: "Lodging an Expression of Interest to the government." },
            { step: "04", title: "Invitation to Apply", description: "Final application submission upon receiving an invitation." }
        ],
        faq: [
            { q: "Which country is best for PR?", a: "Canada, Australia, and New Zealand are popular for their clear PR points systems." },
            { q: "How long does PR take?", a: "Timelines vary greatly, from 6 months for Express Entry to several years for other streams." }
        ]
    }
};
