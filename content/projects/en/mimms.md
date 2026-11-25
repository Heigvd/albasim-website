---
title: MIMMS
metaTitle: 'MIMMS: medical management of major incidents'
funders: HUG · Innosuisse
summary: Simulations for training in the medical management of major incidents.
image: ../../../src/assets/projects/mimms.jpg
imageAlt: A rescue helicopter in flight
page:
  heading: Major Incident Medical Management Simulation
  lead: Major incidents involving many casualties require a specific approach to on-site medical management.
  intro:
    - 'This four-year project led to the development of software simulations designed to train healthcare professionals to manage these stressful situations. It resulted in two simulations now available for training: MIMMSim, for the overall management of the incident, and Mass Casualties Triage, for pre-triage.'
    - Funded by Innosuisse, in collaboration with the Geneva University Hospitals.
  buttons:
    - label: Use MIMMSim
      game: mimmsim
    - label: Use Mass Casualties Triage
      game: mass-casualties-triage
  illustration:
    alt: Top view of an incident site with victims sorted into priority groups, an advanced medical post, an ambulance park, a helicopter landing area and a hospital
    labels:
      hospital: HOSPITAL
      ambulancePark: AMBULANCE PARK
  glance:
    eyebrow: Key information
    heading: Project at a glance
    focus:
      label: Focus
      items: [Emergency medicine, Medical simulation, Scenario authoring]
    period:
      label: Period
      value: 2021–2025
    funding:
      label: Funding
      value: Innosuisse, the Swiss Innovation Agency
    people:
      - label: Main applicants
        people:
          - name: Prof. Dominique Jaccard
            affiliation: AlbaSim, MEI, HEIG-VD, HES-SO
          - name: Dr Laurent Suppan
            affiliation: Geneva University Hospitals (HUG)
  overview:
    eyebrow: Overview
    heading: Overcoming the limits of current training methods for major incident medical management
    diagram:
      type: methods
      alt: 'Current training methods and their limits lead to a new type of software simulation with three innovations: flexible training modes, scenario authoring and analysis of participants’ actions'
      methodsLabel: CURRENT TRAINING METHODS
      limitsLabel: LIMITS
      methods:
        - title: Full-scale exercises
          limits:
            - [Costly to organise]
            - [Few people trained, in key roles]
        - title: Software simulations
          limits:
            - [No coordination, between professions]
            - [Little flexibility in, scenarios and modes]
      projectLabel: THE PROJECT
      projectTitle: A new type of software simulation
      innovations: [Flexible training modes, Scenario authoring, Analysis of participants’ actions]
  outcomes:
    eyebrow: Outcomes
    heading: Simulations and tools for training and research
    cards:
      - icon: monitor
        title: Two simulations
        text: A drill for casualty triage and a simulation for the overall management of a major incident, both with scenario editors and trainer interfaces for debriefing.
        links:
          - label: Mass Casualties Triage
            game: mass-casualties-triage
          - label: MIMMSim
            game: mimmsim
      - icon: heart-pulse
        title: HUMAn, a real-time patient model
        text: A simplified physiological model simulating the respiratory, cardiovascular and brain systems, allowing hundreds of casualties to evolve in real time according to their injuries and care.
  practice:
    eyebrow: From research to practice
    heading: 'Beyond the project: a simulation now part of emergency training'
    paragraphs:
      - The simulations developed in this project are already used to train students and professionals at organisations such as the Geneva University Hospitals, the Geneva School of Paramedics (ESAMB), CERN, the MEDI ambulance school in Bern and several Geneva emergency services. They also enable new research on triage algorithms.
      - Development of both simulations continues beyond the project.
    links:
      - label: MIMMSim
        game: mimmsim
      - label: Mass Casualties Triage
        game: mass-casualties-triage
    image: ../../../src/assets/projects/mimms-practice.jpg
    imageAlt: Emergency professionals training with the simulation in a classroom
  findings:
    eyebrow: Key findings
    heading: What our research shows
    items:
      - text: A simplified physiological model can simulate the real-time evolution of hundreds of trauma patients in a way experienced clinicians judge clinically realistic.
        source: Development and validation study, 15 prehospital professionals · Laurent et al., *JMIR Formative Research*, 2025
        url: https://formative.jmir.org/2025/1/e66201
      - text: In a simulated mass-casualty incident, the simpler Sieve algorithm slightly outperformed the more complex SwissPre in identifying critically injured patients, with no difference in triage time.
        source: Randomized open-label study, 67 participants, 30 simulated patients · Stuby et al., *Prehospital and Disaster Medicine*, 2025
        url: https://doi.org/10.1017/S1049023X25101568
      - text: Simulations with evolving virtual patients make it possible to compare triage protocols under controlled, reproducible conditions, which is hard to achieve in real incidents or live exercises.
        source: Methodological contribution of the two studies above
  partners:
    eyebrow: Partners
    heading: A close collaboration between emergency medicine, computer science and simulation-based learning
    paragraphs:
      - The project was co-directed by Prof. Dominique Jaccard of the AlbaSim team (Media Engineering Institute, HEIG-VD, HES-SO) and Dr Laurent Suppan, PD, Head of the Prehospital Emergency and Resuscitation Unit (UPHR) of the Emergency Department of the Geneva University Hospitals (HUG).
      - Emergency physicians, paramedics, trainers and computer scientists worked together throughout the project, combining expertise in major incident management, medical education and simulation development.
    logos:
      - name: AlbaSim
        logo: ../../../src/assets/logos/albasim.png
        height: 26
      - name: Geneva University Hospitals (HUG)
        logo: ../../../src/assets/partners/hug.png
        height: 40
    acknowledgements:
      heading: Acknowledgements
      text: We warmly thank Innosuisse, the Swiss Innovation Agency, for funding this project (no. 42675.1 IP-SBM), and the Geneva University Hospitals for their substantial contribution.
      funders:
        - name: Innovation project supported by Innosuisse
          url: https://www.innosuisse.admin.ch/en
          logo: ../../../src/assets/funders/innosuisse.png
          height: 144
  resources:
    eyebrow: Resources
    heading: Learn more
    publications: [sieve-swisspre-triage, human-patient-model]
  collaborate:
    title: Collaborate with us
    text: Interested in a research collaboration? We would be glad to discuss joint projects.
    button: Contact us
---

In a major incident, such as a train accident or a building fire, emergency teams must shift from individual to collective medicine. Some health professionals take on coordination roles they do not perform in their daily work. Regular training for these roles is essential.

### The gap

Two types of simulation are used for training in major incident management, each with its limits:

- **Full-scale exercises** are realistic, but costly and complex to organise: many participants are mobilised to train only a few people in key roles. They therefore cannot meet the need for regular training.
- **Existing software simulations** allow repeated training, but focus on specific tasks, do not address coordination between professions and offer little flexibility in scenarios, training modes and analysis of participants’ decisions.

### Project objectives

The project aimed to develop a new type of software simulation, built around three innovations:

1. **Flexible training modes:** individual or group training, on site or remotely.
2. **Scenario authoring system:** enable trainers without programming skills to create their own scenarios.
3. **Analysis of participants’ actions:** support debriefing and research on the management of major incidents.
