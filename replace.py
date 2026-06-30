import os

replacements = {
    "bg-[#050506]": "bg-white",
    "border-white/[0.06]": "border-zinc-200",
    "border-white/[0.05]": "border-zinc-200",
    "border-white/[0.04]": "border-zinc-200",
    "bg-[#0A0A0C]/90": "bg-zinc-50",
    "bg-[#0A0A0C]/[0.76]": "bg-zinc-50",
    "bg-white/[0.015]": "bg-white shadow-sm",
    "bg-white/10": "bg-zinc-200",
    "text-[#E2E8F0]/[0.45]": "text-zinc-500",
    "text-[#E2E8F0]/70": "text-zinc-500",
    "text-[#E2E8F0]/[0.48]": "text-zinc-500",
    "text-[#E2E8F0]/[0.82]": "text-zinc-700",
    "text-[#E2E8F0]/[0.58]": "text-zinc-600",
    "text-[#E2E8F0]": "text-zinc-900",
    "bg-[#E2E8F0]/30": "bg-zinc-300",
    "bg-[#E2E8F0]/20": "bg-zinc-200",
    "bg-[#D4AF37]/60": "bg-primary/60",
    "text-[#030303]": "text-zinc-900",
    "via-white/10": "via-zinc-300",
    "rgba(226,232,240,0.58)": "rgba(113,113,122,0.8)", # zinc-500
    "rgba(226,232,240,0.04)": "rgba(244,244,245,1)", # zinc-100
    "border-white/5": "border-zinc-200",
    "bg-white/[0.025]": "bg-zinc-50"
}

files_to_check = [
    "src/components/DesignGallery.tsx",
    "src/components/SkillsSection.tsx"
]

for filepath in files_to_check:
    with open(filepath, 'r') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(filepath, 'w') as f:
        f.write(content)
print("Replaced successfully")
