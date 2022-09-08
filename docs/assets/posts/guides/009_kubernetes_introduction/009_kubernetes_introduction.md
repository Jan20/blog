<!--
date=2022-08-24
topic=Bash
-->

<img class='full' src='assets/posts/guides/011_hyperledger_indy/thumbnail.png'>

# Kubernetes Introduction

## Starting a local Kubernetes cluster
To test a Kubernetes deployment, a local cluster can be created using Minikube as depiceted below.
```TS
minikube start
minikube dashboard
```

## Secrets Management
In general, Kubernetes handles secrets that are base64 encoded. To encode a secret, run the command stated below.
```TS
echo -n 'secret' | base64
```
Note that the <code>-n</code> flags is used to omit echoing trailing new lines.
```TS
kubectl apply -f <secret-name>.ymal
```

## Applying new Secrets
After having defined and added new secrets, a Kubernetes deployment can be restarted to apply all changes. 
```TS
kubectl rollout restart -n default deployment
```

## Delete a Helm deployment
```TS
helm status <name-of-the-deployment>
```

```TS
helm delete <name-of-the-deployment>
```

## Install a Deployment
```TS
helm install lissi ./ -f ./values.yaml
```