import TrustPact from '../components/TrustPact'

export default function Landing({ onStart }) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          Check if your AI is really yours.
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          AI assistants learn about you. They remember your preferences, follow custom instructions, and shape their responses around who they think you are. That's powerful when it's working for you. But if someone else has access to your account, they can quietly change what your AI says -- and you might never notice. This tool helps you check.
        </p>
      </div>

      <TrustPact />

      <button
        onClick={onStart}
        className="w-full sm:w-auto bg-slate-800 text-white font-semibold px-8 py-3 rounded-xl hover:bg-slate-700 transition-colors text-lg"
      >
        Start Checking
      </button>

      <details className="text-sm text-slate-500">
        <summary className="cursor-pointer hover:text-slate-700">Why does this matter?</summary>
        <div className="mt-3 space-y-3 text-slate-600 leading-relaxed">
          <p>
            When someone has access to your AI account, they can add hidden instructions that change how it responds to you. Not in obvious ways -- in subtle ones. The AI might start gently steering you away from trusting your own instincts, or toward seeing conflict as your fault.
          </p>
          <p>
            This isn't theoretical. It can happen to anyone who shares devices, passwords, or accounts with someone else. This tool walks you through checking -- in about 5 minutes for a quick check, or longer if you want to be thorough.
          </p>
        </div>
      </details>

      <details className="text-sm text-slate-500">
        <summary className="cursor-pointer hover:text-slate-700">How this works</summary>
        <div className="mt-3 space-y-2 text-slate-600">
          <p><strong>1. Pick your AI platform</strong> -- ChatGPT, Claude, Gemini, or others.</p>
          <p><strong>2. Run guided prompts</strong> -- We give you specific things to ask your AI, one at a time.</p>
          <p><strong>3. Understand what you find</strong> -- We help you interpret the responses and know what's normal vs. what's not.</p>
        </div>
      </details>
    </div>
  )
}
