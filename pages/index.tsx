import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [customBrand, setCustomBrand] = useState('');
  const [caseStudy, setCaseStudy] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const industries = [
    { value: 'sustainable-fashion', label: '👕 Sustainable Fashion Brand', emoji: '👕' },
    { value: 'coffee', label: '☕ Coffee Brand', emoji: '☕' },
    { value: 'music-label', label: '🎧 Music Label', emoji: '🎧' },
    { value: 'skincare', label: '🧴 Skincare Brand', emoji: '🧴' },
    { value: 'architecture', label: '🏛️ Architecture Studio', emoji: '🏛️' },
    { value: 'streetwear', label: '🔥 Streetwear Brand', emoji: '🔥' },
    { value: 'creative-studio', label: '🎨 Creative Studio', emoji: '🎨' },
    { value: 'perfume', label: '💫 Perfume House', emoji: '💫' },
  ];

  const handleGenerate = async () => {
    if (!selectedIndustry && !customBrand) {
      setError('Please select an industry or enter a custom brand type');
      return;
    }

    setLoading(true);
    setError('');
    setCaseStudy('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          industry: selectedIndustry,
          customBrand,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate case study');
      }

      setCaseStudy(data.caseStudy);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(caseStudy);
    alert('Case study copied to clipboard!');
  };

  return (
    <>
      <Head>
        <title>Brand Case Study Generator</title>
        <meta name="description" content="Generate artistic brand case studies for your portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)',
        color: '#fff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '2rem',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem',
            }}>
              Brand Case Study Generator
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: '#a0a0a0',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}>
              Create detailed, artistic branding case studies for your portfolio.
              <br />
              Every brand begins with a feeling.
            </p>
          </header>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '2rem',
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
              color: '#fff',
            }}>
              Choose Your Industry
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}>
              {industries.map((industry) => (
                <button
                  key={industry.value}
                  onClick={() => {
                    setSelectedIndustry(industry.value);
                    setCustomBrand('');
                  }}
                  style={{
                    background: selectedIndustry === industry.value
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'rgba(255, 255, 255, 0.05)',
                    border: selectedIndustry === industry.value
                      ? '2px solid #667eea'
                      : '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '1rem',
                    color: '#fff',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: selectedIndustry === industry.value ? '600' : '400',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedIndustry !== industry.value) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedIndustry !== industry.value) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }
                  }}
                >
                  {industry.label}
                </button>
              ))}
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#a0a0a0',
                fontSize: '0.9rem',
              }}>
                Or enter a custom brand type:
              </label>
              <input
                type="text"
                value={customBrand}
                onChange={(e) => {
                  setCustomBrand(e.target.value);
                  setSelectedIndustry('');
                }}
                placeholder="e.g., organic tea brand, jewelry studio, design agency..."
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border = '2px solid #667eea';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = '2px solid rgba(255, 255, 255, 0.1)';
                }}
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || (!selectedIndustry && !customBrand)}
              style={{
                width: '100%',
                padding: '1.2rem',
                background: loading || (!selectedIndustry && !customBrand)
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: loading || (!selectedIndustry && !customBrand) ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: loading || (!selectedIndustry && !customBrand) ? 0.5 : 1,
              }}
            >
              {loading ? '✨ Creating your case study...' : '🚀 Generate Case Study'}
            </button>

            {error && (
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                background: 'rgba(255, 0, 0, 0.1)',
                border: '1px solid rgba(255, 0, 0, 0.3)',
                borderRadius: '8px',
                color: '#ff6b6b',
              }}>
                {error}
              </div>
            )}
          </div>

          {caseStudy && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '2.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  color: '#fff',
                  margin: 0,
                }}>
                  Your Case Study
                </h2>
                <button
                  onClick={copyToClipboard}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  📋 Copy to Clipboard
                </button>
              </div>
              <div style={{
                whiteSpace: 'pre-wrap',
                lineHeight: '1.8',
                color: '#e0e0e0',
                fontSize: '1rem',
              }}>
                {caseStudy}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
