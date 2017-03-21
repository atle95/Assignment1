public var speed     : float;
public var gravity   : float;
public var jumpSpeed : float;

private var verticalSpeed   : float;
private var horozontalSpeed : float;
private var grounded        : boolean;
private var background      : GameObject;
private var foreground      : GameObject;

private var animator : Animator;

function Start() 
{
  grounded = false;


  // We ask for the Animator component attached to our same
  // GameObject and store it in the animator var
  animator = GetComponent(Animator);
  background = GameObject.Find("Background");
  foreground = GameObject.Find("Foreground");
//  camera = GetComponent(Camera);
}

function Update() 
{
  horozontalSpeed = Input.GetAxis("Horizontal") * speed;
  animator.SetFloat("HorozontalSpeed", horozontalSpeed);
  transform.position.x += horozontalSpeed * Time.deltaTime;
//  background.position.x -= horozontalSpeed * Time.deltaTime / 100;
//  foreground.position.x += horozontalSpeed * Time.deltaTime / 100;
//  animator.setFloat("Xposition", transform.position.x);

  // Set the Speed value based on delta and 
  // use this to animate walking.
//  animator.SetFloat ("Speed", Mathf.Abs(horozontalSpeed));

  //position sprite right way
  if (horozontalSpeed < 0)
  {
    animator.SetBool("FacingRight", false);

    transform.localRotation = Quaternion.Euler(0, 180, 0);
  }
  else if (horozontalSpeed > 0)
  {
    animator.SetBool("FacingRight", true);
    transform.localRotation = Quaternion.Euler(0, 0, 0);
  }

  //check if walking
  if(horozontalSpeed != 0)
  {
    animator.SetBool("Walking", true);
  }
  else
  {
	  animator.SetBool("Walking", false);
  }

//  if(Input.GetKeydown("e"))
//  {
//    animator.SetTrigger ("Explode");
//  }

  if(grounded)
  {
    if(Input.GetButton ("Jump")) 
    {
      animator.SetTrigger ("Jump");
      grounded = false;
      verticalSpeed = jumpSpeed;
      transform.position.y += verticalSpeed * Time.deltaTime;
    }
  } 
  else 
  {
    verticalSpeed -= gravity * Time.deltaTime;
    transform.position.y += verticalSpeed * Time.deltaTime;
  }
//  animator.setFloat("Yposition", transform.position.y);
        
  // If we're not grounded we're probably falling...
  animator.SetBool("Grounded", grounded);

  // We can use this to decide whether we're moving upward or
  // downward, could be used to animate jump vs fall
//  animator.SetFloat("VerticalSpeed", verticalSpeed);

  Camera.main.transform.position.x = transform.position.x;
  Camera.main.transform.position.y = transform.position.y;
}

function OnCollisionStay2D(other : Collision2D)
{
  verticalSpeed = 0;
  grounded = true;
}

function OnCollisionExit2D(other : Collision2D)
{
  grounded = false;
}