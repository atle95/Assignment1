#pragma strict

public var aimObject : Transform;
public var range : float;
public var targetLayers : LayerMask;
public var placeableLayers : LayerMask;
public var sparksPrefab : Transform;
public var timeBetweenHits : float;
private var nextHit : float;
public var damage : float;
public var gridOffset = new Vector2(0.29, 0.24);
public var gridSize = new Vector2(0.32, 0.32);
private var currentItem : GameObject;

function Start () {
	
}

function Update () {
	var mousePosition = Camera.main.ScreenToWorldPoint (Input.mousePosition);
	var direction = mousePosition - transform.position;
	  
	direction.x = Mathf.Clamp (direction.x, -range, range);
	direction.y = Mathf.Clamp (direction.y, -range, range);
	direction.z = 0;

	var mag = direction.magnitude;
	direction /= mag;

	var hit = Physics2D.Raycast (transform.position, direction, mag, targetLayers);
	if (hit.collider != null) {
		if (Input.GetMouseButton (0) && Time.time > nextHit) {
			HitTarget (hit);
			nextHit = Time.time + timeBetweenHits;
		}
		aimObject.position = hit.point;
	} else {
		aimObject.position = transform.position + direction * mag;
	}

	if (Input.GetMouseButtonDown (1)) {
		if (HasGroundNeighbor (aimObject.position)) {
			PlaceObject (aimObject.position);
		}
	}
}

private function HitTarget (hit : RaycastHit2D) {
	// Try to get the destroyable component tied to what we are hitting
	// var destroyable = ...

	// if it exists
	// if (destroyable != null) {
		// Add damage to the block
		// Give feedback to let user know they've hit the block
	//}
}

private function HasGroundNeighbor (position : Vector3) {
	var hit : RaycastHit2D;
	hit = Physics2D.Raycast (position, Vector3.up, gridSize.y, placeableLayers);
	if (hit.collider != null) { return true; }
	hit = Physics2D.Raycast (position, Vector3.down, gridSize.y, placeableLayers);
	if (hit.collider != null) { return true; }
	hit = Physics2D.Raycast (position, Vector3.right, gridSize.x, placeableLayers);
	if (hit.collider != null) { return true; }
	hit = Physics2D.Raycast (position, Vector3.left, gridSize.x, placeableLayers);
	if (hit.collider != null) { return true; }
	return false;
}

private function PlaceObject (position : Vector3) {
	if (currentItem != null) {
		position.x -= gridOffset.x;
		position.y -= gridOffset.y;
		var i =	Mathf.RoundToInt (position.x / gridSize.x);
		var j =	Mathf.RoundToInt (position.y / gridSize.y);
		position.x = i * gridSize.x + gridOffset.x;
		position.y = j * gridSize.y + gridOffset.y;

		// Create a new instance of our saved item and make it active
	}
}

public function SetCurrentItem (item : GameObject) {
	var newItemName = item.transform.name.Replace("(Clone)","").Trim();
	var currentItemName = "";
	if (currentItem != null) {
		currentItemName = currentItem.transform.name.Replace("(Clone)","").Trim();
	}
	
	if ((currentItem == null) || (currentItemName != newItemName)) {
		// Create instance of item to use for building more tiles
		// Set our instance as inactive to avoid having it appear before we want to place it.
	}
}
