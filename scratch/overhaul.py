import os

def update_file(filepath, replacements):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return
    with open(filepath, 'r') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Updated {filepath}")

# Update index.css rules
update_file("src/index.css", {
    "color: #1e293b;": "color: #0f172a;",
    "#1e293b 0%": "#0f172a 0%",
    "#1e293b 100%": "#0f172a 100%",
    "color: #1e293b;": "color: #0f172a;",
})

# Update HeroSection
update_file("src/components/HeroSection.tsx", {
    "text-muted-foreground": "text-zinc-500",
})

# Update AILabSection
update_file("src/components/AILabSection.tsx", {
    "text-zinc-900 md:text-5xl": "text-slate-900 md:text-5xl",
    "text-zinc-600 md:text-base": "text-zinc-500 md:text-base",
    "text-zinc-900 transition-colors": "text-slate-900 transition-colors",
    "text-zinc-600": "text-zinc-500",
    "text-zinc-700": "text-zinc-600",
    "text-zinc-500": "text-zinc-500",
})

# Update SkillsSection
update_file("src/components/SkillsSection.tsx", {
    "text-foreground": "text-slate-900",
    "text-muted-foreground": "text-zinc-500",
    "md:text-5xl": "text-slate-900 md:text-5xl",
    "text-primary/75": "text-primary",
})

# Update ContactSection
update_file("src/components/ContactSection.tsx", {
    "text-foreground": "text-slate-900",
    "text-muted-foreground": "text-zinc-500",
    "font-bold tracking-tight mb-6 leading-[1.1]": "font-bold tracking-tight mb-6 leading-[1.1] text-slate-900",
})
