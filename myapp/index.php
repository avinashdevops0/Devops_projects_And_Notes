<?php
session_start();
require_once 'config/database.php';
require_once 'includes/header.php';

// Database connection
$conn = getDBConnection();

// Simple CRUD example
$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_item'])) {
    $item = htmlspecialchars($_POST['item']);
    $stmt = $conn->prepare("INSERT INTO items (name, created_at) VALUES (?, NOW())");
    if ($stmt->execute([$item])) {
        $message = "Item added successfully!";
    }
}

// Fetch items
$stmt = $conn->query("SELECT * FROM items ORDER BY created_at DESC");
$items = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<div class="container">
    <h1>Simple PHP Application</h1>
    
    <?php if ($message): ?>
        <div class="alert alert-success"><?php echo $message; ?></div>
    <?php endif; ?>
    
    <!-- Add Item Form -->
    <form method="POST" class="mb-4">
        <div class="input-group">
            <input type="text" name="item" class="form-control" 
                   placeholder="Enter item name" required>
            <button type="submit" name="add_item" class="btn btn-primary">
                Add Item
            </button>
        </div>
    </form>
    
    <!-- Items List -->
    <h2>Items List</h2>
    <?php if (empty($items)): ?>
        <p>No items found. Add your first item!</p>
    <?php else: ?>
        <ul class="list-group">
            <?php foreach ($items as $item): ?>
                <li class="list-group-item d-flex justify-content-between">
                    <?php echo htmlspecialchars($item['name']); ?>
                    <small class="text-muted">
                        <?php echo date('Y-m-d H:i', strtotime($item['created_at'])); ?>
                    </small>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>
</div>

<?php require_once 'includes/footer.php'; ?>