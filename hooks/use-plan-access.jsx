import { useAuth } from "@clerk/nextjs";
export function usePlanAccess() {
    const {has} = useAuth();

    const isPro= has?.({plan:"pro"})|| false;

    const isFree =!isPro;

    const planAccess={
        resize:true,
        adjust:true,
        crop:true,
        background:isPro,
        ai_extender:isPro,
        ai_edit:isPro
    };

    const hasAccess=(toolId)=>{
        return planAccess[toolId]=== true;
    };

    const getRestrictedTools = ()=>{
        return Object.entries(planAccess)
        .filter(([_, hasAccess])=>!hasAccess)
        .map(([toolId])=>toolId);
    }


    const canCreateProject =(currentProjectCount)=>{
        if(isPro) return true;
        return currentProjectCount<3
    }
    return {isFree,planAccess};
    }

    const canExport = (currentExportThisMonth)=>{
        if(isPro) return true;
        return currentExportThisMonth<20;
    };


return{
    isPro,
    isFree,
    planAccess,
    hasAccess,
    getRestrictedTools,
    canCreateProject,
    canExport
}
    
