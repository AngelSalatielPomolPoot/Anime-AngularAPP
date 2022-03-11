export interface PersonajesBusqueda {
    "data":Array<{
        "id":string,
        "type":string,
        "links":{
            "self":string
        },
        "attributes":{
            "createdAt":string,
            "updatedAt":string,
            "slug":string,
            "names":{
                "en":string,
                "ja_jp":string
            },
            "canonicalName":string,
            "otherNames":Array<{}>,
            "name":string,
            "malId":number,
            "description":string,
            "image":{
                "original":string,
                "meta":{
                    "dimensions":{}
                }
            },           
        },      
    }>,
    "meta":{
        "count":number
    },
    "links":{
        "first":string,
        "next":string,
        "prev":string,
        "last":string
    }

}
