import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiLinkedin } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [statusType, setStatusType] = useState(null);

  const formRef = useRef();

  // Auto-hide status message after 5 seconds
  useEffect(() => {
    if (!statusMessage) return;
    const timer = setTimeout(() => {
      setStatusMessage(null);
      setStatusType(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [statusMessage]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit to Google Form
  const submitToGoogleForm = async () => {
    const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeRfsme-JSeZAVa-mpZ20X5hLwV8mY7bdeFRDPgimWELbRR1Q/formResponse";

    const formDataGoogle = new FormData();
    formDataGoogle.append("entry.548444918", formData.name);
    formDataGoogle.append("entry.454716312", formData.email);
    formDataGoogle.append("entry.1266680494", formData.subject);
    formDataGoogle.append("entry.978256163", formData.message);

    try {
      await fetch(formUrl, { method: "POST", mode: "no-cors", body: formDataGoogle });
      return true;
    } catch (error) {
      console.error("❌ Google Form submission error:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const success = await submitToGoogleForm();

      if (success) {
        setStatusMessage("✅ Thanks for reaching out! I’ll be in touch shortly. 🚀");
        setStatusType("success");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatusMessage("❌ Failed to submit to Google Sheets. Please try again.");
        setStatusType("error");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setStatusMessage("❌ Failed to send message. Please try again.");
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact info
  const contactInfo = [
    { icon: <FiMail className="w-6 h-6" />, title: "Email", details: "maheshwarawale12@gmail.com", link: "mailto:maheshwarawale12@gmail.com" },
    { icon: <FiPhone className="w-6 h-6" />, title: "Phone", details: "+91-9321825853", link: "tel:+919321825853" },
    { icon: <FiMapPin className="w-6 h-6" />, title: "Location", details: "Navi Mumbai, India", link: null }
  ];

  const socialLinks = [
    { icon: <FiLinkedin className="w-6 h-6" />, name: "LinkedIn", url: "https://linkedin.com/in/maheshwar-a-02b6b6163", color: "hover:text-blue-600" }
  ];

  return (
    <section id="contact" className="py-20 section-padding" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <div className="container-max">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(90deg,var(--accent), #7c3aed)' }}></div>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--muted)' }}>
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>Let's Connect</h3>
                <p style={{ color: 'var(--muted)', marginBottom: 16 }}>
                  Whether you have a project in mind, want to collaborate, or just want to say hello, 
                  I'd love to hear from you. Feel free to reach out through any of the channels below.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.02 }} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: 'var(--surface)' }}>
                    <div className="flex-shrink-0 p-3 rounded-lg" style={{ background: 'rgba(16,185,129,0.08)', color: 'var(--accent)' }}>{info.icon}</div>
                    <div>
                      <h4 style={{ fontWeight: 600, color: 'var(--text)' }}>{info.title}</h4>
                      {info.link ? (
                        <a href={info.link} style={{ color: 'var(--muted)' }}>{info.details}</a>
                      ) : (
                        <span style={{ color: 'var(--muted)' }}>{info.details}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>Follow Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a key={index} whileHover={{ scale: 1.1, y: -2 }} href={social.url} target="_blank" rel="noopener noreferrer" style={{ padding: 12, borderRadius: 8, background: 'var(--surface)', color: 'var(--muted)' }}>
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div style={{ background: 'var(--surface)', padding: 20, borderRadius: 12 }}>
                <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>Send Message</h3>
                
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Name *</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-lg" placeholder="Your name" style={{ background: 'transparent', border: '1px solid rgba(0,0,0,0.06)', color: 'var(--text)' }} />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Email *</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-lg" placeholder="your.email@example.com" style={{ background: 'transparent', border: '1px solid rgba(0,0,0,0.06)', color: 'var(--text)' }} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Subject *</label>
                    <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-lg" placeholder="What's this about?" style={{ background: 'transparent', border: '1px solid rgba(0,0,0,0.06)', color: 'var(--text)' }} />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Message *</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="w-full px-4 py-3 rounded-lg" placeholder="Tell me about your project or just say hello!" style={{ background: 'transparent', border: '1px solid rgba(0,0,0,0.06)', color: 'var(--text)' }} />
                  </div>

                  {/* Inline Status Message */}
                  {statusMessage && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ color: statusType === 'success' ? '#16a34a' : '#dc2626' }}>
                      {statusMessage}
                    </motion.div>
                  )}

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 8, background: 'var(--accent)', color: '#fff', display: 'flex', justifyContent: 'center', gap: 8 }}>
                    {isSubmitting ? <div style={{ width: 20, height: 20, border: '2px solid #fff', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /> : <FiSend />}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
