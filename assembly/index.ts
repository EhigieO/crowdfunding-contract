import { Project, listedProjects } from './model';
import { ContractPromiseBatch, context, u128 } from 'near-sdk-as';
// import { compareImpl } from 'assemblyscript/std/assembly/util/string';

export function setProject(project: Project): void {
    let storedCharity = listedProjects.get(project.id);
    if (storedCharity !== null) {
        throw new Error(`a project with ${project.id} already exists`);
    }
    listedProjects.set(project.id, Project.fromPayload(project));
}


export function getProject(id: string): Project | null {
    return listedProjects.get(id);
}


export function getProjects(): Project[] {
    return listedProjects.values();
}

export function donateToProject(projectId: string): void {
    const project = getProject(projectId);
    if (project == null) {
        throw new Error("project not found");
    }

    if (context.attachedDeposit.toString() == "0") {
        throw new Error("attached deposit should be greater than 0");
    }

    ContractPromiseBatch.create(project.owner).transfer(context.attachedDeposit);

    if(!project.donors.includes(context.sender)) {
        project.donors.push(context.sender);
    }
    if(context.attachedDeposit.toString() > project.highest.toString()) {
        project.highest = context.attachedDeposit;
    }
    project.increaseDonation(context.attachedDeposit);
    listedProjects.set(project.id, project);
}

// donate 1 Near to all projects
export function donateToAll(): void {
    const projects = getProjects().filter(project => !project.completed);
    const total = (1000000000000000000000000 * projects.length).toString();
    if(context.attachedDeposit < u128.fromString(total)) {
        throw new Error("attached deposit should be greater than " + total);
    }
    projects.forEach(project => {

        ContractPromiseBatch.create(project.owner).transfer(u128.fromString("1000000000000000000000000"));

        if(!project.donors.includes(context.sender)) {
            project.donors.push(context.sender);
        }
        if("1000000000000000000000000" > project.highest.toString()) {
            project.highest = u128.fromString("1000000000000000000000000")
        }
        project.increaseDonation(u128.fromString("1000000000000000000000000"));
        listedProjects.set(project.id, project);
    });

}

// transfer the ownership of a project to a new owner
export function transferProject(projectId: string, newOwner: string): void {
    const project = getProject(projectId);
    if (project == null) {
        throw new Error("project not found");
    }
    if(project.owner != context.sender) {
        throw new Error("you are not the owner of this charity project");
    }
    project.owner = newOwner;
    listedProjects.set(project.id, project);
}

// delete a project
export function deleteProject(projectId: string): void {
    const project = getProject(projectId);
    if (project == null) {
        throw new Error("charity not found");
    }
    if(project.owner != context.sender) {
        throw new Error("you are not the owner of this charity project");
    }
    listedProjects.delete(project.id);
}


// get all uncompleted projects count
export function getOngoingProjectCount(): number {
    return getProjects().filter(project => !project.completed).length;
}

