const dependentRegions = {
    "Bedfordshire": {
        country: "England",
        regions: ["Bedford", "Central Bedfordshire", "Luton"],
        isoCodes: ["GB-BDF", "GB-CBF", "GB-LUT"]
    },
    "Berkshire": {
        country: "England",
        regions: ["Bracknell Forest", "Reading", "Slough", "West Berkshire", "Windsor and Maidenhead", "Wokingham"],
        isoCodes: ["GB-BRC", "GB-RDG", "GB-SLG", "GB-WBK", "GB-WNM", "GB-WOK"]
    },
    "Buckinghamshire": {
        country: "England",
        regions: ["Buckinghamshire", "Milton Keynes"],
        isoCodes: ["GB-BKM", "GB-MIK"]
    },
    "Cambridgeshire": {
        country: "England",
        regions: ["Cambridgeshire", "Peterborough"],
        isoCodes: ["GB-CAM", "GB-PTE"]
    },
    "Cheshire": {
        country: "England",
        regions: ["Cheshire East", "Cheshire West and Chester", "Halton", "Warrington"],
        isoCodes: ["GB-CHE", "GB-CHW", "GB-HAL", "GB-WRT"]
    },
    "Cornwall": {
        country: "England",
        regions: ["Cornwall", "Isles of Scilly"],
        isoCodes: ["GB-CON", "GB-IOS"]
    },
    "Cumbria": {
        country: "England",
        regions: ["Cumberland", "Westmorland and Furness"],
        isoCodes: ["GB-CBL", "GB-WLF"]
    },
    "Derbyshire": {
        country: "England",
        regions: ["Derby", "Derbyshire"],
        isoCodes: ["GB-DER", "GB-DBY"]
    },
    "Devon": {
        country: "England",
        regions: ["Devon", "Plymouth", "Torbay"],
        isoCodes: ["GB-DEV", "GB-PLY", "GB-TOB"]
    },
    "Dorset": {
        country: "England",
        regions: ["Bournemouth, Christchurch and Poole", "Dorset"],
        isoCodes: ["GB-BCP", "GB-DOR"]
    },
    "Durham": {
        country: "England",
        regions: ["County Durham", "Darlington", "Hartlepool", "Stockton-on-Tees"],
        isoCodes: ["GB-DUR", "GB-DAL", "GB-HPL", "GB-STT"]
    },
    "East Riding of Yorkshire": {
        country: "England",
        regions: ["East Riding of Yorkshire", "Kingston upon Hull"],
        isoCodes: ["GB-ERY", "GB-KHL"]
    },
    "East Sussex": {
        country: "England",
        regions: ["Brighton and Hove", "East Sussex"],
        isoCodes: ["GB-BNH", "GB-ESX"]
    },
    "Essex": {
        country: "England",
        regions: ["Essex", "Southend-on-Sea", "Thurrock"],
        isoCodes: ["GB-ESS", "GB-SOS", "GB-THR"]
    },
    "Gloucestershire": {
        country: "England",
        regions: ["Gloucestershire", "South Gloucestershire"],
        isoCodes: ["GB-GLS", "GB-SGC"]
    },
    "Hampshire": {
        country: "England",
        regions: ["Hampshire", "Portsmouth", "Southampton"],
        isoCodes: ["GB-HAM", "GB-POR", "GB-STH"]
    },
    "Kent": {
        country: "England",
        regions: ["Kent", "Medway"],
        isoCodes: ["GB-KEN", "GB-MDW"]
    },
    "Lancashire": {
        country: "England",
        regions: ["Blackburn with Darwen", "Blackpool", "Lancashire"],
        isoCodes: ["GB-BBD", "GB-BPL", "GB-LAN"]
    },
    "Leicestershire": {
        country: "England",
        regions: ["Leicester", "Leicestershire"],
        isoCodes: ["GB-LCE", "GB-LEC"]
    },
    "Lincolnshire": {
        country: "England",
        regions: ["Lincolnshire", "North East Lincolnshire", "North Lincolnshire"],
        isoCodes: ["GB-LIN", "GB-NEL", "GB-NLN"]
    },
    "North Yorkshire": {
        country: "England",
        regions: ["Middlesbrough", "North Yorkshire", "Redcar and Cleveland", "Stockton-on-Tees", "York"],
        isoCodes: ["GB-MDB", "GB-NYK", "GB-RCC", "GB-STT", "GB-YOR"]
    },
    "Northamptonshire": {
        country: "England",
        regions: ["North Northamptonshire", "West Northamptonshire"],
        isoCodes: ["GB-NNH", "GB-WNH"]
    },
    "Nottinghamshire": {
        country: "England",
        regions: ["Nottingham", "Nottinghamshire"],
        isoCodes: ["GB-NGM", "GB-NTT"]
    },
    "Somerset": {
        country: "England",
        regions: ["Bath and North East Somerset", "North Somerset", "Somerset"],
        isoCodes: ["GB-BAS", "GB-NSM", "GB-SOM"]
    },
    "Staffordshire": {
        country: "England",
        regions: ["Staffordshire", "Stoke-on-Trent"],
        isoCodes: ["GB-STS", "GB-STE"]
    },
    "Shropshire": {
        country: "England",
        regions: ["Shropshire", "Telford and Wrekin"],
        isoCodes: ["GB-SHR", "GB-TFW"]
    },
    "Wiltshire": {
        country: "England",
        regions: ["Swindon", "Wiltshire"],
        isoCodes: ["GB-SWD", "GB-WIL"]
    },

    "Clwyd": {
        country: "Wales",
        regions: ["Conwy", "Denbighshire", "Flintshire", "Wrexham"],
        isoCodes: ["GB-CWY", "GB-DEN", "GB-FLN", "GB-WRX"]
    },
    "Dyfed": {
        country: "Wales",
        regions: ["Carmarthenshire", "Ceredigion", "Pembrokeshire"],
        isoCodes: ["GB-CMN", "GB-CGN", "GB-PEM"]
    },
    "Gwent": {
        country: "Wales",
        regions: ["Blaenau Gwent", "Caerphilly", "Monmouthshire", "Newport", "Torfaen"],
        isoCodes: ["GB-BGW", "GB-CAY", "GB-MON", "GB-NWP", "GB-TOF"]
    },
    "Gwynedd": {
        country: "Wales",
        regions: ["Gwynedd", "Isle of Anglesey"],
        isoCodes: ["GB-GWN", "GB-AGY"]
    },
    "Mid Glamorgan": {
        country: "Wales",
        regions: ["Bridgend", "Merthyr Tydfil", "Rhondda Cynon Taf"],
        isoCodes: ["GB-BGE", "GB-MTY", "GB-RCT"]
    },
    "South Glamorgan": {
        country: "Wales",
        regions: ["Cardiff", "Vale of Glamorgan"],
        isoCodes: ["GB-CRF", "GB-VGL"]
    },
    "West Glamorgan": {
        country: "Wales",
        regions: ["Neath Port Talbot", "Swansea"],
        isoCodes: ["GB-NTL", "GB-SWA"]
    },

    "Jersey": {
        country: "Jersey",
        regions: ["Grouville", "Saint Brélade", "Saint Clement", "Saint Helier", "Saint John", "Saint Lawrence", "Saint Martin, JE", "Saint Mary", "Saint Ouen", "Saint Peter", "Saint Saviour, JE", "Trinity"],
        isoCodes: ["JE-01", "JE-02", "JE-03", "JE-04", "JE-05", "JE-06", "JE-07", "JE-08", "JE-09", "JE-10", "JE-11", "JE-12"]
    },
    "Guernsey": {
        country: "Guernsey",
        regions: ["Castel", "Forest", "Saint Andrew", "Saint Martin, GG", "Saint Peter Port", "Saint Pierre du Bois", "Saint Sampson", "Saint Saviour, GG", "Torteval", "Vale"],
        isoCodes: ["GG-02", "GG-03", "GG-04", "GG-05", "GG-06", "GG-07", "GG-08", "GG-09", "GG-11", "GG-12"]
    },
    "Andorra": {
        country: "Andorra",
        regions: ["Andorra la Vella", "Canillo", "Encamp", "Escaldes–Engordany", "La Massana", "Ordino", "Sant Julià de Lòria"],
        isoCodes: ["AD-07", "AD-02", "AD-03", "AD-08", "AD-04", "AD-05", "AD-06"]
    },
    "Faroe Islands": { 
        country: "Faroe Islands",
        regions: ["Eysturoyar sýsla", "Norðoya sýsla", "Sandoyar sýsla", "Streymoyar sýsla", "Suðuroyar sýsla", "Vága sýsla"],
        isoCodes: ["FO-01", "FO-02", "FO-03", "FO-04", "FO-05", "FO-06"]
    },
    "Liechtenstein": {
        country: "Liechtenstein",
        regions: ["Balzers", "Eschen", "Gamprin", "Mauren", "Planken", "Ruggell", "Schaan", "Schellenberg", "Triesen", "Triesenberg", "Vaduz"],
        isoCodes: ["LI-01", "LI-02", "LI-03", "LI-04", "LI-05", "LI-06", "LI-07", "LI-08", "LI-09", "LI-10", "LI-11"]
    },
    "San Marino": {
        country: "San Marino",
        regions: ["Acquaviva", "Borgo Maggiore", "Chiesanuova", "Domagnano", "Faetano", "Fiorentino", "Montegiardino", "San Marino", "Serravalle"],
        isoCodes: ["SM-01", "SM-06", "SM-02", "SM-03", "SM-04", "SM-05", "SM-08", "SM-07", "SM-09"]
    },
    "Malta": {
        country: "Malta",
        regions: ["Reġjun Għawdex", "Reġjun Lvant", "Reġjun Nofsinhar", "Reġjun Punent", "Reġjun tal-Port", "Reġjun Tramuntana"],
        isoCodes: ["MT-GH", "MT-LV", "MT-NO", "MT-PU", "MT-TP", "MT-TR"]
    },
    "Gorenjska": {
        country: "Slovenia",
        regions: ["Jesenice", "Kranj", "Radovljica", "Škofja Loka", "Tržič"],
        isoCodes: ["SI-041", "SI-052", "SI-102", "SI-122", "SI-131"]
    },
    "Goriška": {
        country: "Slovenia",
        regions: ["Ajdovščina", "Idrija", "Nova Gorica", "Tolmin"],
        isoCodes: ["SI-001", "SI-036", "SI-084", "SI-128"]
    },
    "Jugovzhodna Slovenija": {
        country: "Slovenia",
        regions: ["Črnomelj", "Kočevje", "Metlika", "Novo Mesto", "Ribnica", "Trebnje"],
        isoCodes: ["SI-017", "SI-048", "SI-073", "SI-085", "SI-104", "SI-130"]
    },
    "Koroška": {
        country: "Slovenia",
        regions: ["Dravograd", "Radlje ob Dravi", "Ravne na Koroškem", "Slovenj Gradec"],
        isoCodes: ["SI-025", "SI-101", "SI-103", "SI-112"]
    },
    "Obalno-Kraška": {
        country: "Slovenia",
        regions: ["Izola", "Koper", "Piran", "Sežana"],
        isoCodes: ["SI-040", "SI-050", "SI-090", "SI-111"]
    },
    "Osrednjeslovenska": {
        country: "Slovenia",
        regions: ["Domžale", "Grosuplje", "Kamnik", "Ljubljana", "Logatec", "Vrhnika"],
        isoCodes: ["SI-023", "SI-032", "SI-043", "SI-061", "SI-064", "SI-140"]
    },
    "Podravska": {
        country: "Slovenia",
        regions: ["Lenart", "Maribor", "Ormož", "Pesnica", "Ptuj", "Ruše", "Slovenska Bistrica"],
        isoCodes: ["SI-058", "SI-070", "SI-087", "SI-089", "SI-096", "SI-108", "SI-113"]
    },
    "Pomurska": {
        country: "Slovenia",
        regions: ["Gornja Radgona", "Lendava", "Ljutomer", "Murska Sobota"],
        isoCodes: ["SI-029", "SI-059", "SI-063", "SI-080"]
    },
    "Posavska": {
        country: "Slovenia",
        regions: ["Brežice", "Krško", "Sevnica"],
        isoCodes: ["SI-009", "SI-054", "SI-110"]
    },
    "Primorsko-Notranjska": {
        country: "Slovenia",
        regions: ["Cerknica", "Ilirska Bistrica", "Postojna"],
        isoCodes: ["SI-013", "SI-038", "SI-094"]
    },
    "Savinjska": {
        country: "Slovenia",
        regions: ["Celje", "Laško", "Mozirje", "Slovenske Konjice", "Šentjur", "Šmarje pri Jelšah", "Velenje", "Žalec"],
        isoCodes: ["SI-011", "SI-057", "SI-079", "SI-114", "SI-120", "SI-124", "SI-133", "SI-190"]
    },
    "Zasavska": {
        country: "Slovenia",
        regions: ["Hrastnik", "Litija", "Trbovlje", "Zagorje ob Savi"],
        isoCodes: ["SI-034", "SI-060", "SI-129", "SI-142"]
    },

    "Auvergne-Rhône-Alpes": {
        country: "France",
        regions: ["Allier", "Cantal", "Haute-Loire", "Puy-de-Dôme", "Ain", "Ardèche", "Drôme", "Haute-Savoie", "Isère", "Loire", "Rhône", "Savoie"],
        isoCodes: ["FR-03", "FR-15", "FR-43", "FR-63", "FR-01", "FR-07", "FR-26", "FR-74", "FR-38", "FR-42", "FR-69", "FR-73"]
    },

    "Bourgogne-Franche-Comté": {
        country: "France",
        regions: ["Côte-d'Or", "Nièvre", "Saône-et-Loire", "Yonne", "Doubs", "Jura, FR", "Haute-Saône", "Territoire de Belfort"],
        isoCodes: ["FR-21", "FR-58", "FR-71", "FR-89", "FR-25", "FR-39", "FR-70", "FR-90"]
    },

    "Bretagne": {
        country: "France",
        regions: ["Côtes-d'Armor", "Finistère", "Ille-et-Vilaine", "Morbihan"],
        isoCodes: ["FR-22", "FR-29", "FR-35", "FR-56"]
    },

    "Centre-Val de Loire": {
        country: "France",
        regions: ["Cher", "Eure-et-Loir", "Indre", "Indre-et-Loire", "Loir-et-Cher", "Loiret"],
        isoCodes: ["FR-18", "FR-28", "FR-36", "FR-37", "FR-41", "FR-45"]
    },

    "Corse": {
        country: "France",
        regions: ["Corse-du-Sud", "Haute-Corse"],
        isoCodes: ["FR-2A", "FR-2B"]
    },

    "Île-de-France": {
        country: "France",
        regions: ["Essonne", "Hauts-de-Seine", "Paris", "Seine-et-Marne", "Seine-Saint-Denis", "Val-d'Oise", "Val-de-Marne", "Yvelines"],
        isoCodes: ["FR-91", "FR-92", "FR-75", "FR-77", "FR-93", "FR-95", "FR-94", "FR-78"]
    },

    "Grand Est": {
        country: "France",
        regions: ["Bas-Rhin", "Haut-Rhin", "Ardennes", "Aube", "Haute-Marne", "Marne", "Meurthe-et-Moselle", "Meuse", "Moselle", "Vosges"],
        isoCodes: ["FR-67", "FR-68", "FR-08", "FR-10", "FR-52", "FR-51", "FR-54", "FR-55", "FR-57", "FR-88"]
    },

    "Hauts-de-France": {
        country: "France",
        regions: ["Nord", "Pas-de-Calais", "Aisne", "Oise", "Somme"],
        isoCodes: ["FR-59", "FR-62", "FR-02", "FR-60", "FR-80"]
    },

    "Normandie": {
        country: "France",
        regions: ["Calvados", "Manche", "Orne", "Eure", "Seine-Maritime"],
        isoCodes: ["FR-14", "FR-50", "FR-61", "FR-27", "FR-76"]
    },

    "Nouvelle-Aquitaine": {
        country: "France",
        regions: ["Dordogne", "Gironde", "Landes", "Lot-et-Garonne", "Pyrénées-Atlantiques", "Corrèze", "Creuse", "Haute-Vienne", "Charente", "Charente-Maritime", "Deux-Sèvres", "Vienne"],
        isoCodes: ["FR-24", "FR-33", "FR-40", "FR-47", "FR-64", "FR-19", "FR-23", "FR-87", "FR-16", "FR-17", "FR-79", "FR-86"]
    },

    "Occitanie": {
        country: "France",
        regions: ["Aude", "Gard", "Hérault", "Lozère", "Pyrénées-Orientales", "Ariège", "Aveyron", "Gers", "Haute-Garonne", "Hautes-Pyrénées", "Lot", "Tarn", "Tarn-et-Garonne"],
        isoCodes: ["FR-11", "FR-30", "FR-34", "FR-48", "FR-66", "FR-09", "FR-12", "FR-32", "FR-31", "FR-65", "FR-46", "FR-81", "FR-82"]
    },

    "Pays de la Loire": {
        country: "France",
        regions: ["Loire-Atlantique", "Maine-et-Loire", "Mayenne", "Sarthe", "Vendée"],
        isoCodes: ["FR-44", "FR-49", "FR-53", "FR-72", "FR-85"]
    },

    "Provence-Alpes-Côte d'Azur": {
        country: "France",
        regions: ["Alpes-de-Haute-Provence", "Alpes-Maritimes", "Bouches-du-Rhône", "Hautes-Alpes", "Var", "Vaucluse"],
        isoCodes: ["FR-04", "FR-06", "FR-13", "FR-05", "FR-83", "FR-84"]
    },

    "Kurzemes": {
        country: "Latvia",
        regions: ["Dienvidkurzemes novads", "Kuldīgas novads", "Liepāja", "Saldus novads", "Talsu novads", "Tukuma novads", "Ventspils", "Ventspils novads"],
        isoCodes: ["LV-112", "LV-050", "LV-LPX", "LV-088", "LV-097", "LV-099", "LV-VEN", "LV-106"]
    },
    "Latgales": {
        country: "Latvia",
        regions: ["Augšdaugavas novads", "Balvu novads", "Daugavpils", "Krāslavas novads", "Līvānu novads", "Ludzas novads", "Preiļu novads", "Rēzekne", "Rēzeknes novads"],
        isoCodes: ["LV-111", "LV-015", "LV-DGV", "LV-047", "LV-056", "LV-058", "LV-073", "LV-REZ", "LV-077"]
    },
    "Rīgas": {
        country: "Latvia",
        regions: ["Ādažu novads", "Jūrmala", "Ķekavas novads", "Mārupes novads", "Olaines novads", "Rīga", "Ropažu novads", "Salaspils novads", "Siguldas novads"],
        isoCodes: ["LV-011", "LV-JUR", "LV-052", "LV-062", "LV-068", "LV-RIX", "LV-080", "LV-087", "LV-091"]
    },
    "Vidzemes": {
        country: "Latvia",
        regions: ["Alūksnes novads", "Cēsu novads", "Gulbenes novads", "Limbažu novads", "Madonas novads", "Ogres novads", "Saulkrastu novads", "Smiltenes novads", "Valkas novads", "Valmieras novads", "Varakļānu novads"],
        isoCodes: ["LV-007", "LV-022", "LV-033", "LV-054", "LV-059", "LV-067", "LV-089", "LV-094", "LV-101", "LV-113", "LV-102"]
    },
    "Zemgales": {
        country: "Latvia",
        regions: ["Aizkraukles novads", "Bauskas novads", "Dobeles novads", "Jelgava", "Jelgavas novads", "Jēkabpils novads"],
        isoCodes: ["LV-002", "LV-016", "LV-026", "LV-JEL", "LV-041", "LV-042"]
    },

    "Centru": {
        country: "Moldova",
        regions: ["Anenii Noi", "Călărași", "Criuleni", "Dubăsari", "Hîncești", "Ialoveni", "Nisporeni", "Orhei", "Rezina", "Strășeni", "Șoldănești", "Telenești", "Ungheni"],
        isoCodes: ["MD-AN", "MD-CL", "MD-CR", "MD-DU", "MD-HI", "MD-IA", "MD-NI", "MD-OR", "MD-RE", "MD-ST", "MD-SD", "MD-TE", "MD-UN"]
    },
    "Nord": {
        country: "Moldova",
        regions: ["Bălți", "Briceni", "Dondușeni", "Drochia", "Edineț", "Fălești", "Florești", "Glodeni", "Ocnița", "Rîșcani", "Sîngerei", "Soroca"],
        isoCodes: ["MD-BA", "MD-BR", "MD-DO", "MD-DR", "MD-ED", "MD-FA", "MD-FL", "MD-GL", "MD-OC", "MD-RI", "MD-SI", "MD-SO"]
    },
    "Sud": {
        country: "Moldova",
        regions: ["Basarabeasca", "Cahul", "Cantemir", "Căușeni", "Cimișlia", "Leova", "Ștefan Vodă", "Taraclia"],
        isoCodes: ["MD-BS", "MD-CA", "MD-CT", "MD-CS", "MD-CM", "MD-LE", "MD-SV", "MD-TA"]
    },

    "Federation of Bosnia and Herzegovina": {
        country: "Bosnia and Herzegovina",
        regions: ["Bosnian-Podrinje Canton Goražde", "Canton 10", "Central Bosnia", "Herzegovina-Neretva", "Posavina", "Sarajevo", "Tuzla", "Una-Sana", "West Herzegovina", "Zenica-Doboj"],
        isoCodes: ["BA-05", "BA-10", "BA-06", "BA-07", "BA-02", "BA-09", "BA-03", "BA-01", "BA-08", "BA-04"]
    },

    "Vojvodina": {
        country: "Serbia",
        regions: ["Central Banat", "North Bačka", "North Banat", "South Bačka", "South Banat", "Srem", "West Bačka"],
        isoCodes: ["RS-02", "RS-01", "RS-03", "RS-06", "RS-04", "RS-07", "RS-05"]
    },

    "Eastern": {
        country: "North Macedonia",
        regions: ["Berovo", "Češinovo-Obleševo", "Delčevo", "Karbinci", "Kočani", "Makedonska Kamenica", "Pehčevo", "Probištip", "Štip", "Vinica", "Zrnovci"],
        isoCodes: ["MK-201", "MK-210", "MK-203", "MK-205", "MK-206", "MK-207", "MK-208", "MK-209", "MK-211", "MK-202", "MK-204"]
    },
    "Northeastern": {
        country: "North Macedonia",
        regions: ["Kratovo", "Kriva Palanka", "Kumanovo", "Lipkovo", "Rankovce", "Staro Nagoričane"],
        isoCodes: ["MK-701", "MK-702", "MK-703", "MK-704", "MK-705", "MK-706"]
    },
    "Pelagonia": {
        country: "North Macedonia",
        regions: ["Bitola", "Demir Hisar", "Dolneni", "Krivogaštani", "Kruševo", "Mogila", "Novaci", "Prilep", "Resen"],
        isoCodes: ["MK-501", "MK-502", "MK-503", "MK-504", "MK-505", "MK-506", "MK-507", "MK-508", "MK-509"]
    },
    "Polog": {
        country: "North Macedonia",
        regions: ["Bogovinje", "Brvenica", "Gostivar", "Jegunovce", "Mavrovo i Rostuša", "Tearce", "Tetovo", "Vrapčište", "Želino"],
        isoCodes: ["MK-601", "MK-602", "MK-604", "MK-606", "MK-607", "MK-608", "MK-609", "MK-603", "MK-605"]
    },
    "Skopje": {
        country: "North Macedonia",
        regions: ["Aračinovo", "Čučer-Sandevo", "Ilinden", "Petrovec", "Skopje", "Sopište", "Studeničani", "Zelenikovo"],
        isoCodes: ["MK-802", "MK-816", "MK-807", "MK-810", "MK-85", "MK-812", "MK-813", "MK-806"]
    },
    "Southeastern": {
        country: "North Macedonia",
        regions: ["Bogdanci", "Bosilovo", "Dojran", "Gevgelija", "Konče", "Novo Selo", "Radoviš", "Strumica", "Valandovo", "Vasilevo"],
        isoCodes: ["MK-401", "MK-402", "MK-406", "MK-405", "MK-407", "MK-408", "MK-409", "MK-410", "MK-403", "MK-404"]
    },
    "Southwestern": {
        country: "North Macedonia",
        regions: ["Centar Župa", "Debar", "Debarca", "Kičevo", "Makedonski Brod", "Ohrid", "Plasnica", "Struga", "Vevčani"],
        isoCodes: ["MK-313", "MK-303", "MK-304", "MK-307", "MK-308", "MK-310", "MK-311", "MK-312", "MK-301"]
    },
    "Vardar": {
        country: "North Macedonia",
        regions: ["Čaška", "Demir Kapija", "Gradsko", "Kavadarci", "Lozovo", "Negotino", "Rosoman", "Sveti Nikole", "Veles"],
        isoCodes: ["MK-109", "MK-103", "MK-102", "MK-104", "MK-105", "MK-106", "MK-107", "MK-108", "MK-101"]
    },

    "Central Albania": {
        country: "Albania",
        regions: ["Elbasan", "Tirana"],
        isoCodes: ["AL-03", "AL-11"]
    },
    "Northern Albania": {
        country: "Albania",
        regions: ["Dibër", "Durrës", "Kukës", "Lezhë", "Shkodër"],
        isoCodes: ["AL-09", "AL-02", "AL-07", "AL-08", "AL-10"]
    },
    "Southern Albania": {
        country: "Albania",
        regions: ["Berat", "Fier", "Gjirokastër", "Korçë", "Vlorë"],
        isoCodes: ["AL-01", "AL-04", "AL-05", "AL-06", "AL-12"]
    },

    "Central Montenegro": {
        country: "Montenegro",
        regions: ["Cetinje", "Danilovgrad", "Nikšić", "Podgorica", "Tuzi", "Zeta"],
        isoCodes: ["ME-06", "ME-07", "ME-12", "ME-16", "ME-24", "ME-25"]
    },
    "Coastal Montenegro": {
        country: "Montenegro",
        regions: ["Bar", "Budva", "Herceg Novi", "Kotor", "Tivat", "Ulcinj"],
        isoCodes: ["ME-02", "ME-05", "ME-08", "ME-10", "ME-19", "ME-20"]
    },
    "Northern Montenegro": {
        country: "Montenegro",
        regions: ["Andrijevica", "Berane", "Bijelo Polje", "Gusinje", "Kolašin", "Mojkovac", "Petnjica", "Plav", "Plužine", "Pljevlja", "Rožaje", "Šavnik", "Žabljak"],
        isoCodes: ["ME-01", "ME-03", "ME-04", "ME-22", "ME-09", "ME-11", "ME-23", "ME-13", "ME-15", "ME-14", "ME-17", "ME-18", "ME-21"]
    },
    // Add more mappings as needed
};

export default dependentRegions;