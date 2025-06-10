import type { DevProject, DevProjectTags } from "~/types/portfolio";

export const projects: DevProject[] = [
  // ========================================================================================
  // ======================================= AlgoHive =======================================
  // ========================================================================================
  {
    en: {
      title: "AlgoHive - Programming puzzles",
      shortDesc:
        "A self-hostable coding game platform that allows developers to create puzzles for developers to solve. A full microservices architecture with a focus on DevOps and challenges.",
    },
    fr: {
      title: "AlgoHive - Puzzles de programmation",
      shortDesc:
        "Une plateforme de jeu de codage auto-hébergeable qui permet aux développeurs de créer des puzzles à résoudre. Une architecture complète de microservices axée sur DevOps et les défis.",
    },
    techs: ["Golang", "TypeScript", "Python", "Docker", "Redis"],
    link: "https://github.com/AlgoHive-Coding-Puzzles",
    date: "2025/04",
    tags: ["WebDev", "DevOps", "Challenges"],
  },
  // ========================================================================================
  // ======================================= Portfolio =======================================
  // ========================================================================================
  {
    en: {
      title: "Portfolio Website",
      shortDesc:
        "Modern portfolio built with Next.js, TypeScript, and Tailwind CSS. Features a LinkTree section, a double portfolio for development and photography, and a blog section.",
    },
    fr: {
      title: "Site Web Portfolio",
      shortDesc:
        "Portfolio moderne construit avec Next.js, TypeScript et Tailwind CSS. Présente une section LinkTree, un double portfolio pour le développement et la photographie, et une section blog.",
    },
    techs: ["NextJs", "TypeScript", "Tailwind", "Framer Motion", "React"],
    link: "https://github.com/Eric-Philippe/portfolio",
    date: "2025/06",
    tags: ["WebDev", "DevOps"],
  },
  // ========================================================================================
  // ======================================= HomeLab =======================================
  // ========================================================================================
  {
    en: {
      title: "My HomeLab",
      shortDesc:
        "Follow my journey of building a home lab with self-hosted services, automation, and more. How i've bought a server, set up Proxmox, and created a home lab with Docker, Nextcloud, Jellyfin, and Home Assistant.",
    },
    fr: {
      title: "Mon HomeLab",
      shortDesc:
        "Suivez mon parcours de création d'un home lab avec des services auto-hébergés, de l'automatisation, et plus encore. Comment j'ai acheté un serveur, configuré Proxmox, et créé un home lab avec Docker, Nextcloud, Jellyfin, et Home Assistant.",
    },
    techs: ["Proxmox", "Docker", "TrueNAS", "Grafana", "Prometheus"],
    link: "https://ericp/blog/homelab",
    date: "2024/09",
    tags: ["WebDev", "DevOps", "Other"],
  },
  // ========================================================================================
  // ======================================= AOC =======================================
  // ========================================================================================
  {
    en: {
      title: "Advent of Code",
      shortDesc:
        "My journey through the Advent of Code challenges, from 2022 to 2023, solving daily puzzles with various programming languages, challenging myself to improve my skills and learn new techniques.",
    },
    fr: {
      title: "Advent of Code",
      shortDesc:
        "Mon parcours à travers les défis de l'Advent of Code, de 2022 à 2023, résolvant des énigmes quotidiennes avec divers langages de programmation, me défiant pour améliorer mes compétences et apprendre de nouvelles techniques.",
    },
    techs: ["Python", "JavaScript", "TypeScript", "Rust", "Julia"],
    link: "https://ericp/blog/adventofcode",
    date: "2023/12",
    tags: ["Challenges"],
  },
  // ========================================================================================
  // ======================================= WhatsABook =======================================
  // ========================================================================================
  {
    en: {
      title: "What's a Book ?",
      shortDesc:
        "A web application application for a fictive bookstore, with a full frontoffice for customers allowing them to browse, search, and filter books, and a backoffice for administrators to manage the bookstore.",
    },
    fr: {
      title: "What's a Book ?",
      shortDesc:
        "Une application web pour une librairie fictive, avec une implémentation complète du frontoffice pour les clients leur permettant de parcourir, rechercher et filtrer les livres, et un backoffice pour les administrateurs afin de gérer la librairie.",
    },
    techs: ["Symfony", "PHP", "Twig", "Bootstrap"],
    link: "https://ericp/tech/whatsabook",
    date: "2024/02",
    tags: ["WebDev", "DevOps"],
  },
  // ========================================================================================
  // ======================================= DartScore =======================================
  // ========================================================================================
  {
    en: {
      title: "DartScore",
      shortDesc:
        "A simple lightweight web application to track and analyze dart scores. Easily record your scores, view statistics, and improve your game. Built with React and TypeScript.",
    },
    fr: {
      title: "DartScore",
      shortDesc:
        "Une application web simple et légère pour suivre et analyser les scores de fléchettes. Enregistrez facilement vos scores, consultez des statistiques, et améliorez votre jeu. Construit avec React et TypeScript.",
    },
    techs: ["React", "TypeScript"],
    link: "https://github.com/Eric-Philippe/DartScore",
    date: "2025/03",
    tags: ["WebDev"],
  },
  // ========================================================================================
  // ======================================= GlitchAndBooks =======================================
  // ========================================================================================
  {
    en: {
      title: "Glitch and books",
      shortDesc:
        "An online library manager. Register, sort, and explore your books in detail with an intuitive user interface and statistics, and soon recommendations.",
    },
    fr: {
      title: "Glitch&Books",
      shortDesc:
        "Gestionnaire de votre bibliothèque en ligne. Enregistrez, triez, et explorez vos livres en détails avec une interface utilisateur intuitive et des statistiques, et bientôt des recommandations.",
    },
    techs: ["React", "PHP", "PostgreSQL", "Twig", "Bootstrap", "Docker"],
    link: "https://github.com/Eric-Philippe/WhatsABook",
    date: "2024/03",
    tags: ["WebDev", "DevOps"],
  },
  // ========================================================================================
  // ======================================= MQBroker =======================================
  // ========================================================================================
  {
    en: {
      title: "MQBroker",
      shortDesc:
        "MQBroker is a complete MQ Message Broker implementation made in my company for handling MQ messages with reliability and performance in mind. It features a web interface for managing messages and queues.",
    },
    fr: {
      title: "MQBroker",
      shortDesc:
        "MQBroker est une implémentation complète d'un courtier de messages MQ réalisée dans mon entreprise pour gérer les messages MQ avec fiabilité et performance. Il dispose d'une interface web pour gérer les messages et les files d'attente.",
    },
    techs: ["Java", "Spring Boot", "PostgreSQL", "Thymeleaf"],
    link: "",
    date: "2024/10",
    tags: ["WebDev", "DevOps"],
  },
  // ========================================================================================
  // ======================================= Jaguar =======================================
  // ========================================================================================
  {
    en: {
      title: "Jaguar - Webex Bot",
      shortDesc:
        "Jaguar bot is a Webex chat bot for my team in my company to automatically manage the support email box, providing quick access to information and automating tasks.",
    },
    fr: {
      title: "Jaguar - Bot Webex",
      shortDesc:
        "Jaguar bot est un chat bot sur Webex pour mon équipe dans mon entreprise afin de gérer automatiquement la gestion de la boîte mail de support, en fournissant un accès rapide aux informations et en automatisant les tâches.",
    },
    techs: ["JavaScript"],
    link: "https://github.com/Eric-Philippe/DartScore",
    date: "2024/08",
    tags: ["Bot"],
  },
  // ========================================================================================
  // ======================================= Hillcrest =======================================
  // ========================================================================================
  {
    en: {
      title: "Hillcrest",
      shortDesc:
        "Hillcrest is a promotional site for an association offering educational stays in English-speaking countries for high school students. It features information about the stays, destinations, and testimonials from former participants.",
    },
    fr: {
      title: "Hillcrest",
      shortDesc:
        "Hillcrest est un site de promotion pour une association proposant des séjours éducatifs dans des pays anglophones pour les lycéens. On y retrouve des informations sur les séjours, les destinations, et les témoignages d'anciens participants.",
    },
    techs: ["React", "TypeScript"],
    link: "https://github.com/Eric-Philippe/DartScore",
    date: "2023/09",
    tags: ["WebDev"],
  },
  // ========================================================================================
  // ======================================= Kairos =======================================
  // ========================================================================================
  {
    en: {
      title: "Kairos - Bot Reminder",
      shortDesc:
        "Kairos is an international Discord bot that allows users worldwide to set reminders for important events, tasks, and deadlines. It also enables activity logging to better manage time.",
    },
    fr: {
      title: "Kairos - Bot Rappel",
      shortDesc:
        "Kairos est un bot Discord international permettant aux utilisateurs dans le monde entier de se lancer des rappels pour des événements importants, des tâches et des échéances. Il permet également de logger ses activités afin de mieux gérer son temps.",
    },
    techs: ["TypeScript"],
    link: "https://github.com/Eric-Philippe/DartScore",
    date: "2024/01",
    tags: ["Bot"],
  },
  // ========================================================================================
  // ======================================= CrilBOT =======================================
  // ========================================================================================
  {
    en: {
      title: "Cril - Bot IUT Toulouse",
      shortDesc:
        "A discord bot for the languages and International Relations department of the IUT of Toulouse. The bot allows precise and simplified management of supplies, online activities, and information for students.",
    },
    fr: {
      title: "Cril - Bot IUT Toulouse",
      shortDesc:
        "Un bot discord pour le département des langues et des relations internationales de l'IUT de Toulouse. Le bot permet une gestion précise et simplifiée de l'intendance, des activités en ligne, et des informations pour les étudiants.",
    },
    techs: ["TypeScript"],
    link: "https://github.com/Eric-Philippe/DartScore",
    date: "2024/05",
    tags: ["Bot"],
  },
  // ========================================================================================
  // ======================================= Graveyard =======================================
  // ========================================================================================
  {
    en: {
      title: "Range tes morts",
      shortDesc:
        "Range tes morts is a lightweight web application that allows you to navigate your local cemetery like Google Maps! Draw, integrate, and then fill in the locations of the contents of your cemetery.",
    },
    fr: {
      title: "Range tes morts",
      shortDesc:
        "Range tes morts est une application légère web pour vous déplacer dans votre cimetière local comme Google Maps ! Dessinez, intégrez puis renseignez les emplacements du contenu de votre cimetière.",
    },
    techs: ["React", "TypeScript"],
    link: "https://github.com/Eric-Philippe/DartScore",
    date: "2024/12",
    tags: ["WebDev"],
  },
  // ========================================================================================
  // ======================================= JuliaMarkdown =======================================
  // ========================================================================================
  {
    en: {
      title: "Julia Markdown Joy",
      shortDesc:
        "A versatile tool in Julia for analyzing Markdown files into JSON, extracting specific fields, and converting everything into HTML.",
    },
    fr: {
      title: "Julia Markdown Joy",
      shortDesc:
        "Outil versatile en Julia pour analyser des fichiers Markdown en JSON, extraire des champs spécifiques, et convertir le tout en HTML",
    },
    techs: ["React", "TypeScript"],
    link: "https://github.com/Eric-Philippe/DartScore",
    date: "2024/03",
    tags: ["WebDev"],
  },
  // ========================================================================================
  // ======================================= CrilStatsFusion =======================================
  // ========================================================================================
  {
    en: {
      title: "CrilStatsFusion-Analitics",
      shortDesc:
        "CrilStatsFusion is a complete all in one toolbox for webscrapped data analysis.",
    },
    fr: {
      title: "CrilStatsFusion-Analitics",
      shortDesc:
        "CrilStatsFusion est une boîte à outils complète tout-en-un pour l'analyse de données webscrappées.",
    },
    techs: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    link: "https://github.com/Eric-Philippe/DartScore",
    date: "2024/07",
    tags: ["Tools"],
  },
];

export const getProjectById = (id: number): DevProject | undefined => {
  return projects[id];
};

export const getProjectsByTag = (tag: DevProjectTags): DevProject[] => {
  return projects.filter((project) => project.tags.includes(tag));
};
