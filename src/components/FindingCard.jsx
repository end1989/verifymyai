const levelStyles = {
  green: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300',
  yellow: 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300',
  red: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300',
}

const levelLabels = {
  green: 'Nothing unusual',
  yellow: 'Worth watching',
  red: 'Concern detected',
}

const levelIcons = {
  green: '\u2713',  // checkmark
  yellow: '\u26A0', // warning triangle
  red: '\u26D4',    // no entry
}

export default function FindingCard({ finding, prompt }) {
  return (
    <div className={`border rounded-lg p-4 ${levelStyles[finding.level]}`}>
      <div className="flex justify-between items-start">
        <h3 className="font-medium">{prompt?.title || finding.promptId}</h3>
        <span className="text-xs font-semibold uppercase">
          <span aria-hidden="true">{levelIcons[finding.level]} </span>
          {levelLabels[finding.level]}
        </span>
      </div>
      {finding.note && <p className="mt-2 text-sm">{finding.note}</p>}
    </div>
  )
}
