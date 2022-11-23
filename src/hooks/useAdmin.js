import { useEffect, useState } from "react"


const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [isAdminLoading, setIsAdminLoading] = useState(true)
    useEffect(() => {
        fetch(`https://doctors-portal-server-lime-nu.vercel.app/allusers/admin/${email}`)
            .then(res => res.json())
            .then(data => {

                setIsAdmin(data.isAdmin)
                setIsAdminLoading(false)
                // console.log(isAdmin)
            })
    }, [email])
    return [isAdmin, isAdminLoading]
}
export default useAdmin;
