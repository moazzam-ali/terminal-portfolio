'use client'

import { useState, useEffect, useRef } from 'react'
import { CommandLine } from './CommandLine'
import { CommandOutput } from './CommandOutput'
import { TerminalIcon } from 'lucide-react'

const INITIAL_MESSAGE = `
Welcome to the portfolio of Moazzam Ali!
Type 'help' to see available commands.
`

export function Terminal() {
  const [history, setHistory] = useState([INITIAL_MESSAGE])
  const [inputValue, setInputValue] = useState('')
  const terminalRef = useRef(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (command) => {
    setHistory(prev => [...prev, `$ ${command}`])
    
    switch (command.toLowerCase()) {
      case 'help':
        setHistory(prev => [...prev, `
Available commands:
- about: Learn more about me
- skills: View my technical skills
- projects: See my recent projects
- education: View my educational background
- experience: Check out my work experience
- contact: Get my contact information
- 3d: Learn about my 3D web development skills
- hobbies: Discover my interests outside of coding
- clear: Clear the terminal
- social: View my social media profiles
- resume: Download my resume (placeholder)
`])
        break
      case 'about':
        setHistory(prev => [...prev, `
I'm Moazzam Ali, a passionate frontend developer with a love for creating engaging and interactive web experiences. 
I thrive on the excitement of trying new technologies and the satisfaction of overcoming challenges. 
The dopamine rush I get when completing even small feats keeps me motivated and always pushing forward.

As a frontend engineer, I'm constantly exploring the latest web technologies and frameworks to build 
responsive, accessible, and performant user interfaces. I have a keen eye for design and enjoy bringing 
creative concepts to life through code.

My expertise extends to creating immersive 3D websites, blending the worlds of web development and 
interactive design to craft unique user experiences that stand out in the digital landscape.
`])
        break
      case 'skills':
        setHistory(prev => [...prev, `
Technical Skills:
- Frontend: Next.js, React.js, Gatsby, TypeScript, JavaScript (ES6+)
- Styling: Tailwind CSS, SCSS, Styled-Components, CSS3
- UI Libraries: Ant Design, Shadcn, Chakra UI
- Backend: Node.js, Express.js
- 3D & Animation: Three.js, Spline, GSAP, Framer Motion
- Version Control: Git, GitHub
- CMS: Webflow
- Responsive Design
- Web Performance Optimization
- Cross-Browser Compatibility
- Accessibility (a11y) Best Practices
- RESTful APIs
- GraphQL
`])
        break
      case 'projects':
        setHistory(prev => [...prev, `
Recent Projects:
1. 3D Product Showcase: Built an interactive 3D product viewer using Three.js and Next.js
2. E-commerce Platform: Developed a responsive online store with Gatsby and Shopify integration
3. Portfolio Website: Created a personal portfolio site with animated transitions using Framer Motion
4. Dashboard Application: Constructed a data visualization dashboard with React and D3.js
5. Blog Platform: Built a performant blog using Next.js with MDX for content management
`])
        break
      case 'education':
        setHistory(prev => [...prev, `
Education:
- Bachelor of Science in Computer Science
  University of Engineering and Technology, Taxila
  Graduated with honors
`])
        break
      case 'experience':
        setHistory(prev => [...prev, `
Work Experience:
1. Senior Frontend Developer at TechInnovate (2021 - Present)
   - Lead development of responsive web applications using React and Next.js
   - Implemented 3D elements in web projects using Three.js and Spline
   - Mentored junior developers and conducted code reviews

2. Frontend Developer at WebSolutions Inc. (2019 - 2021)
   - Developed and maintained client websites using Gatsby and Webflow
   - Improved site performance and SEO rankings for multiple projects
   - Collaborated with designers to implement pixel-perfect UIs

3. Junior Web Developer at StartupHub (2018 - 2019)
   - Assisted in building interactive prototypes for startup pitches
   - Gained experience with React and modern JavaScript practices
   - Contributed to the company's internal component library
`])
        break
      case 'contact':
        setHistory(prev => [...prev, `
Contact Information:
Email: moazzam435j@gmail.com
GitHub: github.com/moazzam-ali
Phone: +923165518392
`])
        break
      case '3d':
        setHistory(prev => [...prev, `
3D Web Development Skills:
- Three.js for creating 3D graphics and animations in the browser
- Spline for designing and integrating 3D models into web projects
- GSAP (GreenSock Animation Platform) for smooth animations and transitions
- Framer Motion for adding fluid animations to React components
- WebGL shaders for custom visual effects
- Optimizing 3D performance for various devices and browsers
`])
        break
      case 'hobbies':
        setHistory(prev => [...prev, `
Hobbies and Interests:
- Exploring new web technologies and frameworks
- Contributing to open-source projects
- Attending tech meetups and conferences
- 3D modeling and digital art
- Reading tech blogs and staying updated with industry trends
- Solving coding challenges on platforms like LeetCode and HackerRank
`])
        break
      case 'social':
        setHistory(prev => [...prev, `
Social Media Profiles:
- LinkedIn: linkedin.com/in/moazzam-ali (placeholder)
- Twitter: twitter.com/moazzam_dev (placeholder)
- CodePen: codepen.io/moazzam-ali (placeholder)
- Dev.to: dev.to/moazzam_ali (placeholder)
`])
        break
      case 'resume':
        setHistory(prev => [...prev, `
Resume download link: 
https://example.com/moazzam-ali-resume.pdf (placeholder)

Note: This is a placeholder link. Replace it with your actual resume download link when available.
`])
        break
      case 'clear':
        setHistory([])
        break
      default:
        setHistory(
          prev => [...prev, `Command not found: ${command}. Type 'help' for a list of available commands.`]
        )
    }
  }

  return (
    (<div
      className="bg-blue-900 text-white p-4 rounded-lg shadow-lg w-full max-w-2xl mx-auto h-[80vh] flex flex-col">
      <div className="flex items-center mb-4">
        <TerminalIcon className="mr-2" />
        <h1 className="text-xl font-bold">Moazzam Ali's Terminal Portfolio</h1>
      </div>
      <div ref={terminalRef} className="flex-1 overflow-y-auto mb-4 font-mono">
        {history.map((item, index) => (
          <CommandOutput key={index} output={item} />
        ))}
      </div>
      <CommandLine
        value={inputValue}
        onChange={setInputValue}
        onSubmit={(value) => {
          handleCommand(value)
          setInputValue('')
        }} />
    </div>)
  );
}

