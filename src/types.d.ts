export type Mail = {    
    email?: string, 
    subject?: string, 
    name?: string, 
    tel?: string, 
    message: string, 
}

type User = {
    userName: string,
    firstName: string, 
    lastName: string,
    age?: number,
    tel: string,
    whatsapp?: string, 
    email?: string,
    userType: "admin" | 'user'
}

type tel = { tel: string, owner?: string }
export type Location = "" | "north" | "south" | "center" | "yosh" | 'website';

export type Snif = {
    name?: String,
    tel: string[],
    whatsapp?: string[], 
    email?: string[],
    city: string
    address: string,
}

export type Business = {
    site_name: string, 
    link: string, 
    link2?: string, 
    link3?: string, 
    facebook_link1?: string, 
    facebook_link2?: string, 
    facebook_link3?: string[],
    linkedIn_link?: string, 
    instagram_link?: string
    email1?: string, 
    email2?: string, 
    tel1?: string, 
    tel2?: string, 
    whatsapp?: string, 
    location: Location,
    address?: string,
    snifim?: Snif[],
    message?: string, 
    description?: string, 
}

type Business1 = {
    org_name: string, 
    web_link: string[], 
    facebook_link: string[], 
    linkedIn_link?: string[], 
    instagram_link?: string[],
    email?: string[], 
    tel?: tel[], 
    whatsapp?: tel[], 
    location: Location,
    address?: String,
    snifim?: Snif[],
    message?: string, 
    description?: string, 
    Offerable?: [],
}

export type SubCategorie = {
    cat: string,
    desc?: string
    links: Business[]
}

export type Categorie = {
    name: string,
    desc: string,
    links: SubCategorie[]
} 

export type Kishurit = {
    job: Categorie[],
    text: {
        desc: string,
        about: string
    }
}
