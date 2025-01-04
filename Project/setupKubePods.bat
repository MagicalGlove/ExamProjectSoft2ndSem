@echo Setting up Kubenetess pods

@call kubectl delete deployment api
@call kubectl delete deployment client
@call kubectl delete deployment grafana
@call kubectl delete deployment prometheus
@call kubectl delete deployment kafka
@call kubectl delete deployment zookeeper
@call kubectl delete service api
@call kubectl delete service client
@call kubectl delete service grafana
@call kubectl delete service prometheus
@call kubectl delete service kafka
@call kubectl delete service zookeeper

@call docker compose build

@call kubectl apply -f .\kubemanifests.yaml