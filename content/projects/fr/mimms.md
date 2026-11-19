---
title: MIMMS
funders: HUG · Innosuisse
summary: Des simulations pour la formation à la gestion médicale des événements majeurs.
image: ../../../src/assets/projects/mimms.jpg
imageAlt: Un hélicoptère de sauvetage en vol
page:
  heading: Simulation de la gestion médicale des événements majeurs
  lead: Les événements majeurs impliquant de nombreuses victimes exigent une approche spécifique de la prise en charge médicale sur le terrain.
  intro:
    - 'Ce projet de quatre ans a permis de développer des simulations logicielles destinées à former les professionnels de la santé à la gestion de ces situations stressantes. Il a donné naissance à deux simulations aujourd’hui disponibles pour la formation: MIMMSim, pour la gestion globale de l’événement, et Mass Casualties Triage, pour le pré-triage.'
    - Financé par Innosuisse, en collaboration avec les Hôpitaux universitaires de Genève.
  buttons:
    - label: Utiliser MIMMSim
      game: mimmsim
    - label: Utiliser Mass Casualties Triage
      game: mass-casualties-triage
  illustration:
    alt: Vue de dessus d’un site d’intervention, avec les victimes réparties par priorité, un poste médical avancé, une place de parc pour ambulances, une zone d’atterrissage d’hélicoptère et un hôpital
    labels:
      hospital: HÔPITAL
      ambulancePark: PARC AMBULANCES
  glance:
    eyebrow: Informations clés
    heading: Le projet en bref
    focus:
      label: Domaines
      items: [Médecine d’urgence, Simulation médicale, Création de scénarios]
    period:
      label: Période
      value: 2021–2025
    funding:
      label: Financement
      value: Innosuisse, l’Agence suisse pour l’encouragement de l’innovation
    people:
      - label: Requérants principaux
        people:
          - name: Prof. Dominique Jaccard
            affiliation: AlbaSim, MEI, HEIG-VD, HES-SO
          - name: Dr Laurent Suppan
            affiliation: Hôpitaux universitaires de Genève (HUG)
  overview:
    eyebrow: Présentation
    heading: Dépasser les limites des méthodes actuelles de formation à la gestion médicale des événements majeurs
    diagram:
      type: methods
      alt: 'Les méthodes de formation actuelles et leurs limites mènent à un nouveau type de simulation logicielle, avec trois innovations : des modes de formation flexibles, la création de scénarios et l’analyse des actions des participants'
      methodsLabel: MÉTHODES DE FORMATION ACTUELLES
      limitsLabel: LIMITES
      methods:
        - title: Exercices grandeur nature
          limits:
            - - Coûteux à organiser
            - - Peu de personnes formées
              - aux rôles clés
        - title: Simulations logicielles
          limits:
            - - Pas de coordination
              - entre professions
            - - Peu de flexibilité dans
              - scénarios et modes
      projectLabel: LE PROJET
      projectTitle: Un nouveau type de simulation logicielle
      innovations:
        - Modes de formation flexibles
        - Création de scénarios
        - Analyse des actions des participants
  outcomes:
    eyebrow: Résultats
    heading: Des simulations et des outils pour la formation et la recherche
    cards:
      - icon: monitor
        title: Deux simulations
        text: Un exercice de triage des victimes et une simulation de la gestion globale d’un événement majeur, tous deux avec des éditeurs de scénarios et des interfaces formateur pour le débriefing.
        links:
          - label: Mass Casualties Triage
            game: mass-casualties-triage
          - label: MIMMSim
            game: mimmsim
      - icon: heart-pulse
        title: HUMAn, un modèle de patient en temps réel
        text: Un modèle physiologique simplifié qui simule les systèmes respiratoire, cardiovasculaire et cérébral, et fait évoluer des centaines de victimes en temps réel selon leurs blessures et les soins reçus.
  practice:
    eyebrow: De la recherche à la pratique
    heading: 'Au-delà du projet : une simulation intégrée à la formation en médecine d’urgence'
    paragraphs:
      - Les simulations développées dans ce projet servent déjà à former des étudiants et des professionnels dans des institutions comme les Hôpitaux universitaires de Genève, l’École supérieure de soins ambulanciers de Genève (ESAMB), le CERN, l’école d’ambulanciers MEDI à Berne et plusieurs services d’urgence genevois. Elles permettent aussi de nouvelles recherches sur les algorithmes de triage.
      - Le développement des deux simulations se poursuit au-delà du projet.
    links:
      - label: MIMMSim
        game: mimmsim
      - label: Mass Casualties Triage
        game: mass-casualties-triage
    image: ../../../src/assets/projects/mimms-practice.jpg
    imageAlt: Des professionnels de l’urgence s’entraînant avec la simulation dans une salle de cours
  findings:
    eyebrow: Résultats clés
    heading: Ce que montrent nos recherches
    items:
      - text: Un modèle physiologique simplifié peut simuler l’évolution en temps réel de centaines de patients traumatisés, de façon jugée cliniquement réaliste par des cliniciens expérimentés.
        source: Étude de développement et de validation, 15 professionnels du préhospitalier · Laurent et al., *JMIR Formative Research*, 2025
        url: https://formative.jmir.org/2025/1/e66201
      - text: Lors d’une simulation d’afflux massif de victimes, l’algorithme Sieve, plus simple, a légèrement mieux identifié les blessés graves que le SwissPre, plus complexe, sans différence de durée de triage.
        source: Étude randomisée ouverte, 67 participants, 30 patients simulés · Stuby et al., *Prehospital and Disaster Medicine*, 2025
        url: https://doi.org/10.1017/S1049023X25101568
      - text: Des simulations avec des patients virtuels qui évoluent permettent de comparer des protocoles de triage dans des conditions contrôlées et reproductibles, difficiles à obtenir lors d’incidents réels ou d’exercices.
        source: Apport méthodologique des deux études ci-dessus
  partners:
    eyebrow: Partenaires
    heading: Une collaboration étroite entre médecine d’urgence, informatique et apprentissage par la simulation
    paragraphs:
      - Le projet a été codirigé par le Prof. Dominique Jaccard, de l’équipe AlbaSim (Institut Media Engineering, HEIG-VD, HES-SO), et par le Dr Laurent Suppan, PD, responsable de l’Unité d’urgences préhospitalières et de réanimation (UPHR) du Service des urgences des Hôpitaux universitaires de Genève (HUG).
      - Médecins urgentistes, ambulanciers, formateurs et informaticiens ont travaillé ensemble tout au long du projet, en réunissant leurs compétences en gestion des événements majeurs, en formation médicale et en développement de simulations.
    logos:
      - name: AlbaSim
        logo: ../../../src/assets/logos/albasim.png
        height: 26
      - name: Hôpitaux universitaires de Genève (HUG)
        logo: ../../../src/assets/partners/hug.png
        height: 40
    acknowledgements:
      heading: Remerciements
      text: Nous remercions chaleureusement Innosuisse, l’Agence suisse pour l’encouragement de l’innovation, d’avoir financé ce projet (no 42675.1 IP-SBM), ainsi que les Hôpitaux universitaires de Genève pour leur importante contribution.
      funders:
        - name: Projet d’innovation soutenu par Innosuisse
          url: https://www.innosuisse.admin.ch/fr
          logo: ../../../src/assets/funders/innosuisse.png
          height: 144
  resources:
    eyebrow: Ressources
    heading: Pour approfondir
    publications: [sieve-swisspre-triage, human-patient-model]
  collaborate:
    title: Collaborons
    text: Une collaboration de recherche vous intéresse ? Nous serions heureux de discuter de projets communs.
    button: Contactez-nous
---

Lors d’un événement majeur, comme un accident ferroviaire ou l’incendie d’un bâtiment, les équipes d’urgence doivent passer d’une médecine individuelle à une médecine collective. Certains professionnels de la santé assument des rôles de coordination qu’ils n’exercent pas au quotidien. Il est essentiel de s’entraîner régulièrement à ces rôles.

### Le manque

Deux types de simulation sont utilisés pour se former à la gestion des événements majeurs, chacun avec ses limites :

- **Les exercices grandeur nature** sont réalistes, mais coûteux et complexes à organiser : de nombreux participants sont mobilisés pour ne former que quelques personnes aux rôles clés. Ils ne peuvent donc pas répondre au besoin d’entraînement régulier.
- **Les simulations logicielles existantes** permettent de répéter les entraînements, mais se concentrent sur des tâches précises, n’abordent pas la coordination entre professions et offrent peu de flexibilité dans les scénarios, les modes de formation et l’analyse des décisions des participants.

### Objectifs du projet

Le projet visait à développer un nouveau type de simulation logicielle, construit autour de trois innovations :

1. **Modes de formation flexibles :** formation individuelle ou en groupe, sur place ou à distance.
2. **Système de création de scénarios :** permettre aux formateurs sans compétences en programmation de créer leurs propres scénarios.
3. **Analyse des actions des participants :** faciliter le débriefing et la recherche sur la gestion des événements majeurs.
