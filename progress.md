Uso mongoose para interactuar con la base de datos, sigo las especificaciones
del git hub oficial,
crea las api
los modelos 
en la pàgina principal traigo los datos del backend, ya después todos los traigo, de la api

tengo un documento "comment" que tiene un atributo "replies" que contiene documentos "comment"
entonces creo un comentario y actualizo el comentario añadiendole el id del comentario que estoy agregando. 

en la interfaz creo la página principal, en donde creo renderizo "CardComments" que reciben el comentario.
el cual tiene el id del usuario creador entonces hace la petición a la api y esta a la db
y trae la información
si este comentario tiene replies renderizo otro componente "CardCommentReply" el se le pasa el id del comentario
ya que como dije replies es un array de id que hacen referencia a otros comentarios
entonces le paso el id, este hace la petición a la base de datos y renderiza
un "CardComment" y entonces así hago un tipo de recursividad.


To do:
    Hacer el formulario para crear un componente
    y el crud de los comentario

Testear el borrar comentario cuando se esta mencionando a alguien
    
No he testeado el borrar un comentario cuando se menciona a alguien, pero ya hice el de actualizar
un comentario si tiene mención o no, hice un componente *UpdateComment* que se renderiza en vez del contenido normal
en *CardComment* y que lo que hace es que recibe userReplyng, el comentario, el user, y getComments, que lo que hace es actualizar todo los comentarios,
el inconveniente que tuve fue que la actualizar un comentario sin mención no servía pero un con mención si,
y era que no le estaba pasando el getComments a traves del *CardReplyComment* que es el que renderiza
una respuesta de un comentario. en fin ahí se aprende.

Cambie ciertos metodos de consulta, para poder actualizar la información de una forma más sencilla
solo paso la información y el ODM es el que se encarga de actualizar

para así poder actualizar el score y el contenido en el mismo controlador,
pero para crear y eliminar comentarios respuestas, hice otra ruta "replies" porque tengo que crear el comentario
y añadirlo a la lista "replies" del comentario al que se le responde.

entonces tuve que modificar ciertas cosas del front, como pasar el comentario por distintos componentes
y como uso "recursividad" para poder pintar los comentarios, lo que hice fue establecer
las props partivulares de los que son respuesta como false y así manejar cuando es una respuesta o es un comentario normal.

encontre un bug de alguna forma cuando envio una respuesta se genera en los comentarios principales => cuando hago el getComments no filtro entonces solo tenía que aplicar el mismo filtro
de cuando lo hago la primera vez

ahora el bug es que cuando respondo a alguien que ya ha respuesto se hace chiquito, y
claro se le añade al comentario que ya es respuesta, entonces debería debuscar la forma
de hacer que se añada al comentario padre y no que haga del hijo el padre.
    litro, lo que tuve que hacer es mandarle el comentario padre, es muy enredado de entender
    ya que es la primera vez que lo hago, lo hice practicamente igual que para eliminar
    ay weon mi menteee.

Para actualizar un comentario que sea repuesta lo actualiza pero no lo muestra en el front
esto porque no cambian  las dependencias para hacer la petición, lo que hice fue crear un estado
que contenga el contenido del comentario y se lo paso a "CardComment" que por defecto va a ser false,
así puedo usarlo tanto en comentarios que son respuestas como los que son principales, también se lo paso al "updatedComment" que cuando actualiza setea el estado
y así hace otra vez la petición para ese comentario en el useEffect.