# 🌌 Cosmic Companion

A space-themed, highly conversational AI chatbot built as a frontend assignment for Thinkly Labs. The Cosmic Companion serves as an interactive guide to the universe, capable of returning predefined space lore and dynamically fetching real summaries from Wikipedia.

### 🔗 Live Demo
*cosmic-companion-six.vercel.app*

---

## 🚀 Why I Picked This Topic
I picked **Space Exploration & Astronomy** because it perfectly complements modern **glassmorphism** UI trends. The dark, glowing aesthetic naturally reflects the depth and mystery of the cosmos. Furthermore, astronomy naturally prompts curiosity and open-ended questions, which serves as a brilliant vessel to showcase dynamic UI states (like typing indicators, gracefully degraded error states, and empty states that prompt engagement) in a chatbot interface.

## ✨ "Frontend Thinking" Features
The application focuses heavily on user-centric interactions and polished details:
1. **Dynamic Intelligence Fallbacks:** Includes local keyword matching for immediate "in-character" answers, and elegantly falls back to a live Wikipedia REST API to dynamically fetch clean, readable definitions for uncharted queries.
2. **Glassmorphic Aesthetic:** Layered `backdrop-blur` UI panels combined with subtle gradient glows (`cosmic-glow`) using Tailwind CSS v3.
3. **Animated Micro-interactions:** Sent messages gracefully slide up, the `[Send]` button fades onto the screen via **Framer Motion**, and the custom loading indicator bounces while the bot "thinks" (simulating API latency).
4. **Delightful Empty States:** The initial screen prompts users with clickable suggestions so they aren't faced with a blank, intimidating input box.

## 🛠️ Tech Stack
- **Framework:** React + Vite
- **Styling:** Tailwind CSS (v3)
- **UI Architecture:** DaisyUI
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 📦 How to Run Locally

Clone the repository and install the dependencies:
```bash
git clone <your-repo-link>
cd cosmic-companion
npm install
```

Start the Vite development server:
```bash
npm run dev
```

Open `http://localhost:5173` in your browser to interact with the Cosmic Companion!
