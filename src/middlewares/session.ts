import { Request, Response, NextFunction } from "express"




export const isAdmin =  (
    rq: Request,
    re: Response,
    nf: NextFunction 
    ) => {
    if (rq.session.user?.isAdmin) {
  
      nf()
    
    }else{
  
      return re.status(401).json('Unauthorized')
    }
    
  }

export const isAuthenticated = async (
    rq: Request,
    re: Response,
    nf: NextFunction 
    ) => {
    if (rq.session?.user) {
      
      nf()
    
    }else{
      re.status(401).json("Please log in")
    }
    
  };
  
  