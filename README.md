# SwiftieSwipe
 En Taylor Swift-upplevelse inbakat i ett familjärt tinder skal, Swipea bland låtarna och spara dem du tycker om!
 Se över din lista som sparas igenom localStorage och ta bort de du inte vill eller alla om du skulle önska att börja om!

#För att starta!:
1. öppna terminalen i huvudprojektet. Undersök vilken mapp du är i genom kommando ls.
2. Om du inte är i SwiftieSwipe/swiftieswipe gör följande kommando cd swftieswipe.
3. Därefter skriver behöver du installera de "dependancies" vi har för projektet
4. kör npm install i terminalen
5. Kör sedan npm run dev i terminalen för att starta dev servern. 
6. Öppna localhost:3000 som du hittar i terminalen

#Varför React/NextJS 
Vi valde att arbeta med React i detta projektet främst för att det verkade spännande och man har hört mycket om det. 
Som man snabbt inser genom att googla runt eller bara kolla omkring så är ekosystemet runt React enormt. 
Vi ville gärna jobba mot ett modernt CSS-Ramverk för styling och därför var React + Tailwind en väldigt bra kombo. 

Men varför React o inte Vue eller Angular till.ex? 

Vi kan börja med o säga att vi ville inte göra det alldeles för svårt o tungt. Ingen av oss var så värst sugna på att arbeta med TypeScript eller Types, 
så Angular var redan där inte super intressant för oss. Angular skulle också ha en ganska så brant inlärningskurva när man läste på mer om det och ha allmänt mindre redan inbyggda "optimeringar" av koden som genereras i DOM-trädet vid kompilering. 

Egentligen för ett projekt i storlek som detta hade Vue varit ett väldigt bra val, Vue med sitt fokus på att vara ganska så "lightweight" som grund men med möjlighet för att lägga till de delar man behöver som i vårt fall state-mangement för att rendera och uppdatera låtarna utan att användaren behöver göra kompletta omladdningar av sidan.

Både Vue o React kör på en JSX approach och kombinerar HTML och JS i samma fil, när man kollar upp exempel på hur syntaxen är för de olika språken så är det väldigt likt varandra. 

I slutändan kan man säga att vi valde React pågrund av dess storlek, alla resurser bibliotek, ramverk osv... React verkar finnas överallt och vi var nyfikna över vad det faktiskt handlade om.