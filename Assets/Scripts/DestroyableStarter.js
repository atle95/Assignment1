public var maxHitpoints = 100.0f;
private var currentHitpoints : float;
public var collectablePrefabs : Transform[];

function Start () 
{
  currentHitpoints = maxHitpoints;
}

function TakeDamage(damage : float)
{
  // Decrease hit points by damage

  // if hit points have reached zero
  var col = GetComponent(Collider2D);
  if (collectablePrefabs != null) 
  {
    for (var prefab : Transform in collectablePrefabs) 
    {
	  if (prefab != null)
	  {
        
      }
	}
  }
}