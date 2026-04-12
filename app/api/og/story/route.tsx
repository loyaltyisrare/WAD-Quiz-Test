import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams, protocol, host } = new URL(request.url);

    const score = searchParams.get('score');
    const band = searchParams.get('band');
    const bandColor = searchParams.get('color') || '#9ca3af';
    
    // Construct absolute URL for the logos
    // Using simple next/og compatible image rendering
    const logoUrl = `${protocol}//${host}/brand/logo/wad-logo.png`;
    const bottomLogoUrl = `${protocol}//${host}/brand/footer logo/wad-meaningv2w.png`;

    const title = score ? `${score}%` : 'WAD';
    const subtitle = band ? `${band}` : 'Addicted?';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#090909',
            color: '#ffffff',
            padding: '80px',
            position: 'relative',
          }}
        >
          {/* Decorative Elements */}
          <div style={{ position: 'absolute', top: '10%', right: '5%', width: '400px', height: '400px', backgroundColor: bandColor, filter: 'blur(150px)', opacity: 0.15, borderRadius: 'full' }} />
          <div style={{ position: 'absolute', bottom: '15%', left: '5%', width: '300px', height: '300px', backgroundColor: bandColor, filter: 'blur(120px)', opacity: 0.1, borderRadius: 'full' }} />

          {/* Top Logo */}
          <img 
            src={logoUrl} 
            alt="WAD Logo" 
            style={{ 
              width: 500, 
              objectFit: 'contain', 
              marginBottom: 120 
            }} 
          />
          
          <div style={{ 
            fontSize: 40, 
            color: '#ffffff30', 
            textTransform: 'uppercase', 
            letterSpacing: '8px',
            fontWeight: 800,
            marginBottom: 20
          }}>
            Addiction Score
          </div>

          <div style={{ 
            fontSize: 240, 
            fontWeight: 900,
            marginBottom: 20,
            color: bandColor,
            letterSpacing: '-10px',
            display: 'flex'
          }}>
            {title}
          </div>

          <div style={{ 
            fontSize: 70, 
            fontWeight: 'bold', 
            color: '#white', 
            backgroundColor: '#ffffff05',
            border: `2px solid ${bandColor}40`,
            padding: '24px 60px',
            borderRadius: '60px',
            marginTop: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}>
            {subtitle}
          </div>
          
          {/* Bottom Branding */}
          <div style={{
            position: 'absolute',
            bottom: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <img 
              src={bottomLogoUrl} 
              alt="Meaning Logo" 
              style={{ width: 320, objectFit: 'contain', marginBottom: 20, opacity: 0.4 }} 
            />
            <div style={{
              fontSize: 32,
              color: '#ffffff20',
              fontWeight: 700,
              letterSpacing: '4px',
              textTransform: 'uppercase'
            }}>
              TAKE THE TEST AT WOMENAREDRUGS.COM
            </div>
          </div>
        </div>
      ),
      {
        width: 1080,
        height: 1920,
      }
    );
  } catch (e: any) {
    console.error(e);
    return new Response(`Failed to generate the image`, { status: 500 });
  }
}
