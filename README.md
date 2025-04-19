# jam-shelf

## build

### frontend

```bash
docker build -t jam-shelf-f --target runtime-web --network=host .
```

### backend

```bash
docker build -t jam-shelf-b --target runtime-api --network=host .
```
