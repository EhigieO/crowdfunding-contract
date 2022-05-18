import {PersistentUnorderedMap, u128, context } from "near-sdk-as";
@nearBindgen
export class Project{
    id: string;
    name: string;
    purpose: string;
    image: string;
    location: string;
    goal: u128;
    raised: u128;
    donors: Array<string>;
    donations: u32;
    owner: string;
    highest: u128;
    completed: boolean;
    public static fromPayload(payload: Project): Project{
        const project = new Project();
        project.id = payload.id;
        project.name = payload.name;
        project.purpose = payload.purpose;
        project.image = payload.image;
        project.location = payload.location;
        project.goal = payload.goal;
        project.owner = context.sender;
        project.completed = false;
        project.raised = u128.Zero;
        project.highest = u128.Zero;
        project.donors = [];
        return project;
    }
    public increaseDonation(amount: u128): void{
        this.donations = this.donations + 1;
        this.raised = u128.add(this.raised, amount);
        if(this.raised >= this.goal) {
            this.completed = true;
        }
    }
}
export const listedProjects = new PersistentUnorderedMap<string, Project>("LISTED_PROJECTS");