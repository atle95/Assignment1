#pragma strict

public var sortingLayer : String;
private var particles : ParticleSystem;

function Start () {
	particles = GetComponent(ParticleSystem);
    particles.GetComponent(Renderer).sortingLayerName = sortingLayer;
}

function Update () {
	if (!particles.IsAlive()) {
		Destroy(gameObject);
	}
}
