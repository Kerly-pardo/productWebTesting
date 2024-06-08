# Interacción con la Base de Datos MongoDB
## MongoDB
```
docker run --name=mongobootcamp -d -p 27017:27017 -v /Users/alejandroromero/docs/bootcampdb/data:/data/db --restart=always mongo
```

### Que información tiene este comando:

* `docker run --name=mongobootcamp` le dice a Docker que nuestro nuevo contenedor se llamará `mongobootcamp`
* `-d` ejecuta el contenedor en segundo plano (modo separado)
* `-p 27017:27017` asigna el puerto `27017` en la máquina virtual host al puerto `27017` en el contenedor. Esto es necesario porque el servidor de bases de datos escucha las conexiones en el puerto `27017` de manera predeterminada.
* `-v /Users/alejandroromero/docs/bootcampdb/data:/data/db` le dice al sistema de archivos contenedor que monte el volumen `/data/db` que acabamos de crear en la ruta `/Users/alejandroromero/docs/bootcampdb/data:/data/db`. Esto significa que cualquier dato que el contenedor guarde o cree en ese directorio se guardará en el volumen `/data/db`.
* `--restart=always` crea una política de reinicio para su contenedor. Ahora su contenedor se iniciará cada vez que se inicie la máquina virtual Docker. Si no se configuró, tendría que iniciar manualmente el contenedor cada vez que la VM se iniciara con `docker start mongobootcamp`
* `mongo` le dice a Docker que extraiga el repositorio `mongo` de Docker Hub, usando MongoDB 7.0.x

### Verificar que esta arriba el contenedor:
```shell
docker container ls
```

### Verificar que esta arriba el volumen
```shell
docker volume ls
```

### Acceder al container a través del shell
```shell
docker exec -it mongobootcamp bash
```

### Acceder a la consola de mongobootcamp a través del shell
```shell
root@7985c36067ac:/# mongosh
```
```shell
root@e2f4b9f8e1e6:/# mongosh
Current Mongosh Log ID: 6626c74808d5d743e7c934dc
Connecting to:          mongobootcamp://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.4
Using MongoDB:          7.0.8
Using Mongosh:          2.2.4

For mongosh info see: https://docs.mongobootcamp.com/mongobootcamp-shell/


To help improve our products, anonymous usage data is collected and sent to MongoDB periodically (https://www.mongobootcamp.com/legal/privacy-policy).
You can opt-out by running the disableTelemetry() command.

------
   The server generated these startup warnings when booting
   2024-04-22T20:20:35.134+00:00: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
   2024-04-22T20:20:35.134+00:00: /sys/kernel/mm/transparent_hugepage/enabled is 'allways'. We suggest setting it to 'never' in this binary version
   2024-04-22T20:20:35.134+00:00: vm.max_map_count is too low
------

```

### Creación de una base de datos en mongobootcamp
```shell
> use bootcamp
switched to db bootcamp
```

### Creación de una colección en `bootcamp`
```shell
bootcamp> db.createCollection('users');
{ "ok" : 1 }
```

### Verificación de la colección `users` en `bootcamp`
```shell
bootcamp> show collections
users
```

### Insertando un registro en la colección `users` en `bootcamp`
```shell
bootcamp> db.users.insertOne({firstname: "Alejandro", lastname: "Romero", phone: "3392283382", email: "yopo@gmail.com"})
{
  acknowledged: true,
  insertedId: ObjectId("6324e9a6ab7e9c532e7f36af")
}
```
### Buscando un registro en la colección `users` en `bootcamp`
```shell
bootcamp> db.users.findOne()
{
  _id: ObjectId('6626c87808d5d743e7c934dd'),
  firstname: 'Alejandro',
  lastname: 'Romero',
  phone: "3392283382",
  email: 'yopo@gmail.com'
}
```
### Insertando otro registro en la colección `users` en `bootcamp`
```shell
bootcamp> db.users.insertOne({firstname: "Marcela", lastname: "Triana", phone: "4492283382", email: "yopa@gmail.com"})
{
  acknowledged: true,
  insertedId: ObjectId('6626cb0108d5d743e7c934de')
}

bootcamp> db.users.findOne()
{
  _id: ObjectId('6626c87808d5d743e7c934dd'),
  firstname: 'Alejandro',
  lastname: 'Romero',
  phone: "3392283382",
  email: 'yopo@gmail.com'
}

```
### listando registros en la colección `users` en `bootcamp`
```shell
bootcamp> db.users.find()
[
  {
    _id: ObjectId('6626c87808d5d743e7c934dd'),
    firstname: 'Alejandro',
    lastname: 'Romero',
    phone: "3392283382",
    email: 'yopo@gmail.com'
  },
  {
    _id: ObjectId('6626cb0108d5d743e7c934de'),
    firstname: 'Marcela',
    lastname: 'Triana',
    phone: "4492283382",
    email: 'yopa@gmail.com'
  }
]
```
### buscando registros especificos en la colección `users` en `bootcamp`
```shell
bootcamp>  db.users.findOne({email: "yopa@gmail.com"})
{
  _id: ObjectId('6626cb0108d5d743e7c934de'),
  firstname: 'Marcela',
  lastname: 'Triana',
  phone: "4492283382",
  email: 'yopa@gmail.com'
}
```
### Buscando un registros que no está en la colección `users` en `bootcamp`
```shell
bootcamp>  db.users.findOne({email: "yopa@gmail.co"})
null

```
### insertando multiples registros en la colección `users` en `bootcamp`

`db.users.insertMany([{"firstname" : "Edwin","lastname" : "Soroch","phone" : "223933453542","email" : "eider3454@gmail.com"}, {"firstname" : "Josae","lastname" : "Santamars","phone" : "49444544","email" : "josedfkjhfdk@gmail.com"}])`

```shell
bootcamp> db.users.insertMany([
... {
..... 	"firstname" : "Edwin",
..... 	"lastname" : "Soroch",
..... 	"phone" : "223933453542",
..... 	"email" : "eider3454@gmail.com"
..... },
... {
..... 	"firstname" : "Josae",
..... 	"lastname" : "Santamars",
..... 	"phone" : "49444544",
..... 	"email" : "josedfkjhfdk@gmail.com"
..... }])
{
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6626cdde08d5d743e7c934df'),
    '1': ObjectId('6626cdde08d5d743e7c934e0')
  }

}
```
### Actualizar registro en la colección `users` en `bootcamp`
```shell
bootcMP>  db.users.updateOne({"phone": 49444544},{$set: {"firstname" : "Jose", "lastname" : "Santamaria","email" : "jose@gmail.com","phone": "31249338382"}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}

```
### Eliminar registro en la colección `users` en `bootcamp`
```shell
bootcamp> db.users.deleteOne({ _id: ObjectId('6626cb0108d5d743e7c934de')})
{ acknowledged: true, deletedCount: 1 }
```

### Eliminar la colección `users` en `bootcamp`
```shell
bootcamp> db.users.delete.drop()
true
```

## Cargar información a las colecciones
### Colección Users
pass: base64::`HolaMundoBootcamp`
```
docker exec -i mongobootcamp sh -c "mongoimport -c users -d bootcamp --jsonArray --drop" < users.json
```
### Colección Products
```
docker exec -i mongobootcamp sh -c "mongoimport -c products -d bootcamp --jsonArray --drop" < products.json
```